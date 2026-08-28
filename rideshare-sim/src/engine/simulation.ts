import { makeRng } from './prng';
import { makeH, buildCutoffs, type Cutoffs } from './search';
import type {
  AgentState,
  Driver,
  ExitReason,
  MatchRecord,
  PlatformId,
  PlatformState,
  Rider,
  SimConfig,
  SimSnapshot,
  TimeSeriesPoint,
} from './types';

// ─── Internal mutable state ───────────────────────────────────────────────────

interface MutableState {
  t: number;
  riders: Rider[];
  drivers: Driver[];
  platforms: { A: PlatformState; B: PlatformState };
  matchRecords: MatchRecord[];
  timeSeries: TimeSeriesPoint[];
  done: boolean;
  rng: ReturnType<typeof makeRng>;
  config: SimConfig;
  nextRiderId: number;
  nextDriverId: number;
  // animation event sets for current tick
  switchedRiders: Set<number>;
  switchedDrivers: Set<number>;
  searchedRiders: Set<number>;
  searchedDrivers: Set<number>;
  arrivedRiders: Set<number>;
  arrivedDrivers: Set<number>;
  rejectedRiders: Array<{ id: number; platform: PlatformId; queueLen: number }>;
  rejectedDrivers: Array<{ id: number; platform: PlatformId; queueLen: number }>;
  // Correlated cohort shocks. These live on their OWN rng instance so that the
  // main stream is structurally untouchable: with sigma = 0 no draw is taken at
  // all, and even with sigma > 0 the main stream's draw sequence is unchanged.
  shockRng: ReturnType<typeof makeRng>;
  uR: number; vR: number;   // rider side: common, differential (each ~ N(0,1))
  uD: number; vD: number;   // driver side
  // The rival log-price each agent saw when it last paid to search. The
  // write-up's search is one-shot; this engine re-evaluates every queued agent
  // every tick, so without a re-search trigger an agent in the band would pay
  // on every tick of its spell. Kept off the agent objects so the snapshot deep
  // copy does not grow.
  lastSeenR: Map<number, number>;
  lastSeenD: Map<number, number>;
}

// ─── Agent generation ─────────────────────────────────────────────────────────

function generateAgents(config: SimConfig, rng: ReturnType<typeof makeRng>): {
  riders: Rider[];
  drivers: Driver[];
} {
  const { alphaR, alphaD } = config;
  // If alphaR/alphaD are set, apply cohort-size sensitivity at z=0 baseline
  // (surge at t=0 is surgeSchedule(0))
  const z0 = config.surgeSchedule(0);
  const nR = Math.round(config.nRiders * Math.exp(alphaR * z0));
  const nD = Math.round(config.nDrivers * Math.exp(alphaD * z0));

  const riders: Rider[] = [];
  for (let i = 0; i < nR; i++) {
    const wtp = rng.logNormal(config.muR, config.sigmaR);
    const defaultPlatform: PlatformId = rng.uniform() < config.piR ? 'A' : 'B';
    const patience = rng.exponential(config.lambdaR);
    riders.push({
      id: i,
      wtp,
      state: 'QUEUED_' + defaultPlatform as AgentState,
      defaultPlatform,
      currentPlatform: defaultPlatform,
      entryTime: 0,
      queueEntryTime: 0,
      totalWait: 0,
      searchCount: 0,
      switchCount: 0,
      matchTime: null,
      transactionPrice: null,
      exitReason: null,
      patience,
    });
  }

  const drivers: Driver[] = [];
  for (let j = 0; j < nD; j++) {
    const reservationWage = rng.logNormal(config.muD, config.sigmaD);
    const defaultPlatform: PlatformId = rng.uniform() < config.piD ? 'A' : 'B';
    const patience = rng.exponential(config.lambdaD);
    drivers.push({
      id: j,
      reservationWage,
      state: 'QUEUED_' + defaultPlatform as AgentState,
      defaultPlatform,
      currentPlatform: defaultPlatform,
      entryTime: 0,
      queueEntryTime: 0,
      totalWait: 0,
      searchCount: 0,
      switchCount: 0,
      matchTime: null,
      transactionWage: null,
      exitReason: null,
      patience,
    });
  }

  return { riders, drivers };
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function initState(config: SimConfig): MutableState {
  const rng = makeRng(config.seed);
  // A distinct, decorrelated seed. The golden-ratio constant is the usual
  // choice for cheaply decorrelating two streams from one seed.
  const shockRng = makeRng((config.seed ^ 0x9e3779b9) >>> 0);
  const { riders, drivers } = generateAgents(config, rng);

  const riderQueueA = riders.filter(r => r.currentPlatform === 'A').map(r => r.id);
  const riderQueueB = riders.filter(r => r.currentPlatform === 'B').map(r => r.id);
  const driverQueueA = drivers.filter(d => d.currentPlatform === 'A').map(d => d.id);
  const driverQueueB = drivers.filter(d => d.currentPlatform === 'B').map(d => d.id);

  const wA = (1 - config.tauA) * config.p0A;
  const wB = (1 - config.tauB) * config.p0B;

  return {
    t: 0,
    riders,
    drivers,
    platforms: {
      A: { price: config.p0A, wage: wA, riderQueue: riderQueueA, driverQueue: driverQueueA },
      B: { price: config.p0B, wage: wB, riderQueue: riderQueueB, driverQueue: driverQueueB },
    },
    matchRecords: [],
    timeSeries: [],
    done: false,
    rng,
    config,
    nextRiderId: riders.length,
    nextDriverId: drivers.length,
    switchedRiders: new Set(),
    switchedDrivers: new Set(),
    searchedRiders: new Set(),
    searchedDrivers: new Set(),
    arrivedRiders: new Set(),
    arrivedDrivers: new Set(),
    rejectedRiders: [],
    rejectedDrivers: [],
    shockRng,
    // Start the factors at their STATIONARY distribution, not at zero. Starting
    // at zero makes Var(a_t) = sigma^2 (1 - phi^2t) while the -sigma^2/2 mean
    // correction is applied at full strength, so the mean arrival rate is biased
    // low early in every run: measured -0.27% at sigma=0.25 over 200 ticks, and
    // -1.38% at sigma=0.6, which breaches a 1% tolerance. Pure transient, but
    // free to remove.
    uR: shockRng.normal(), vR: shockRng.normal(),
    uD: shockRng.normal(), vD: shockRng.normal(),
    lastSeenR: new Map(),
    lastSeenD: new Map(),
  };
}

// ─── Correlated cohort shocks ─────────────────────────────────────────────────

/** Loadings on the common and differential factors, from (sigma, rho). */
function loadings(sigma: number, rho: number): { s1: number; s2: number } {
  const r = Math.max(-0.999999, Math.min(0.999999, rho));
  return { s1: sigma * Math.sqrt((1 + r) / 2), s2: sigma * Math.sqrt((1 - r) / 2) };
}

/**
 * Advance both AR(1) factor pairs one tick, on the shock stream only.
 *
 * The sqrt(1 - phi^2) scaling holds the stationary variance at exactly 1, so
 * sigma keeps its meaning when the half-life changes. Without it, turning up
 * persistence would silently turn up amplitude.
 *
 * Draws are taken only when a sigma is non-zero, and always four at a time in a
 * fixed order, so the shock realisation is a function of the tick index alone.
 */
function advanceShocks(s: MutableState): void {
  const { config } = s;
  if (config.sigmaShockR <= 0 && config.sigmaShockD <= 0) return;
  const h = Math.max(1e-6, config.shockHalfLife);
  const phi = Math.pow(2, -1 / h);
  const k = Math.sqrt(Math.max(0, 1 - phi * phi));
  const g = s.shockRng;
  s.uR = phi * s.uR + k * g.normal();
  s.vR = phi * s.vR + k * g.normal();
  s.uD = phi * s.uD + k * g.normal();
  s.vD = phi * s.vD + k * g.normal();
  // Keep exp() far from overflow no matter what the user sets. +-6 stationary
  // sd is unreachable in practice; this is a guard, not a modelling choice.
  const cl = (x: number) => Math.max(-6, Math.min(6, x));
  s.uR = cl(s.uR); s.vR = cl(s.vR); s.uD = cl(s.uD); s.vD = cl(s.vD);
}

/**
 * Per-platform arrival rates. The -sigma^2/2 term is a lognormal mean
 * correction and is NOT optional: without it, switching the shock on raises the
 * average arrival rate by exp(sigma^2/2) and every calibrated number drifts.
 */
function arrivalRates(s: MutableState, z: number): {
  rA: number; rB: number; dA: number; dB: number;
} {
  const { config } = s;
  const baseR = config.arrivalRateR * Math.exp(config.alphaR * z);
  const baseD = config.arrivalRateD * Math.exp(config.alphaD * z);
  const lr = loadings(config.sigmaShockR, config.rhoShockR);
  const ld = loadings(config.sigmaShockD, config.rhoShockD);
  const cR = (config.sigmaShockR * config.sigmaShockR) / 2;
  const cD = (config.sigmaShockD * config.sigmaShockD) / 2;
  const aA = lr.s1 * s.uR + lr.s2 * s.vR - cR;
  const aB = lr.s1 * s.uR - lr.s2 * s.vR - cR;
  const bA = ld.s1 * s.uD + ld.s2 * s.vD - cD;
  const bB = ld.s1 * s.uD - ld.s2 * s.vD - cD;
  return {
    rA: baseR * config.piR * Math.exp(aA),
    rB: baseR * (1 - config.piR) * Math.exp(aB),
    dA: baseD * config.piD * Math.exp(bA),
    dB: baseD * (1 - config.piD) * Math.exp(bB),
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rival(p: PlatformId): PlatformId {
  return p === 'A' ? 'B' : 'A';
}

function removeFromQueue(queue: number[], id: number): void {
  const idx = queue.indexOf(id);
  if (idx !== -1) queue.splice(idx, 1);
}

function exitRider(s: MutableState, rider: Rider, reason: ExitReason): void {
  rider.state = 'EXITED';
  rider.exitReason = reason;
  if (rider.currentPlatform) {
    removeFromQueue(s.platforms[rider.currentPlatform].riderQueue, rider.id);
  }
  rider.currentPlatform = null;
  s.lastSeenR.delete(rider.id);
}

function exitDriver(s: MutableState, driver: Driver, reason: ExitReason): void {
  driver.state = 'EXITED';
  driver.exitReason = reason;
  if (driver.currentPlatform) {
    removeFromQueue(s.platforms[driver.currentPlatform].driverQueue, driver.id);
  }
  driver.currentPlatform = null;
  s.lastSeenD.delete(driver.id);
}

/**
 * Search cutoffs for both platforms, once per tick.
 *
 * mu_x is the HAZARD-ADJUSTED ARRIVAL-RATE ratio, not the queue-length ratio.
 * The engine's price update enforces log((Q_R+eps)/(Q_D+eps)) -> -gamma*z/eta,
 * so the realised queue ratio is pinned near zero by construction and its
 * variance measures the price controller's residual error rather than the
 * market. It is also endogenous, which would destroy the property that the
 * observed price is a sufficient statistic for the platform's state — the whole
 * basis of the conditional belief. Using A = Lambda_R/(q + lambda_R) instead
 * makes the write-up's clearing condition term-for-term identical to this
 * engine's stationarity condition, and reproduces its measured stationary price
 * to about 0.2%.
 */
function buildTickCutoffs(s: MutableState, z: number): Record<PlatformId, Cutoffs> {
  const { config } = s;
  const rates = arrivalRates(s, z);
  // Beliefs use a fixed reference take rate, so that a platform deviating on tau
  // is not seen through instantly.
  const H = makeH({
    muR: config.muR, sigmaR: config.sigmaR,
    muD: config.muD, sigmaD: config.sigmaD,
    tau: config.tauBelief,
  });
  const sa = config.sigmaShockR, sb = config.sigmaShockD, sq = config.sigmaQ;
  const varX = sa * sa + sb * sb + sq * sq;
  const sigmaX = Math.sqrt(varX);
  // sigma_q is independent across platforms, so it adds variance but no
  // covariance — which is why raising it lowers rho.
  const rhoDerived = varX > 0
    ? (config.rhoShockR * sa * sa + config.rhoShockD * sb * sb) / varX
    : 0;
  // An explicitly stated belief overrides the derived one. This is how a
  // rational-expectations calibration is expressed: set these to the moments the
  // engine actually generates rather than the ones the shock nominally implies.
  const sigmaXUsed = config.beliefSigmaX ?? sigmaX;
  const rhoUsed = config.beliefRho ?? rhoDerived;

  const out = {} as Record<PlatformId, Cutoffs>;
  for (const plat of ['A', 'B'] as PlatformId[]) {
    const q = 1 - Math.exp(-(plat === 'A' ? config.muMatchA : config.muMatchB) * config.dt);
    const lamR = plat === 'A' ? rates.rA : rates.rB;
    const lamD = plat === 'A' ? rates.dA : rates.dB;
    const muX = Math.log(Math.max(1e-12, lamR) / Math.max(1e-12, lamD))
              + Math.log((q + config.lambdaD) / (q + config.lambdaR));
    // ── Liquidity discount ────────────────────────────────────────────────
    // The price-based rule above is blind to whether the rival has anybody to
    // transact with: an agent would switch to a better price and an empty board.
    // Scale the option value by the ratio of the probability of ACTUALLY
    // transacting on the rival to that on the agent's own platform.
    //
    // The right object is the engine's own per-agent match hazard. Matching
    // draws Binomial(min(Q_R, Q_D), q_j), so a queued rider on platform k
    // matches next tick with probability
    //      psi_R(k) = q_k * min(1, Q_D(k) / Q_R(k))
    // and symmetrically for a driver. Two things the previous form
    // (min(1, n_other/(1 + n_own)), ratioed and then clamped to <= 1) got wrong:
    //   - it omitted q_k entirely, so it could not see a liquidity difference
    //     that lives in the MATCHING TECHNOLOGY rather than in the queues. That
    //     is exactly the rural calibration, where muMatchB = 0.042 < muMatchA =
    //     0.060 IS the increasing-returns-to-density externality being modelled.
    //   - clamping the ratio to <= 1 made the discount a ONE-SIDED BRAKE: it
    //     could only ever discourage switching into the thinner platform, never
    //     encourage switching into the thicker one. That is a tipping force
    //     imposed by the functional form rather than derived, and it is what
    //     produced the paradox that turning the discount ON reduced switching
    //     yet RAISED the share of ticks with an empty Lyft driver queue.
    // The switcher counts ITSELF in the rival's own-side queue (+1) but is
    // already counted at home: that marginal correction is the congestion the
    // agent imposes on the platform it moves to, and without it a stampede into
    // an empty platform looks costless to every member of the stampede.
    let gainR: number | undefined;
    let gainD: number | undefined;
    if (config.liquidityDiscount) {
      const rv = rival(plat);
      const own = s.platforms[plat], oth = s.platforms[rv];
      const qOwn = q;
      const qOth = 1 - Math.exp(-(rv === 'A' ? config.muMatchA : config.muMatchB) * config.dt);
      // psi(q, otherSide, ownSide): ownSide already includes the agent itself.
      const psi = (qk: number, nOther: number, nOwn: number) =>
        qk * Math.min(1, nOther / Math.max(1, nOwn));
      const psiROwn = psi(qOwn, own.driverQueue.length, own.riderQueue.length);
      const psiROth = psi(qOth, oth.driverQueue.length, oth.riderQueue.length + 1);
      const psiDOwn = psi(qOwn, own.riderQueue.length, own.driverQueue.length);
      const psiDOth = psi(qOth, oth.riderQueue.length, oth.driverQueue.length + 1);
      // A zero own-side hazard means the agent has nothing to lose by looking,
      // so the gain is unbounded above; cap it so the cutoff stays finite.
      const MAXG = 1e3;
      gainR = psiROwn > 0 ? Math.min(MAXG, psiROth / psiROwn) : (psiROth > 0 ? MAXG : 1);
      gainD = psiDOwn > 0 ? Math.min(MAXG, psiDOth / psiDOwn) : (psiDOth > 0 ? MAXG : 1);
    }
    const c = buildCutoffs({
      pj: s.platforms[plat].price,
      muX, sigmaX: sigmaXUsed, rho: rhoUsed,
      sR: config.sR, sD: config.sD,
      tau: config.tauBelief,
      H, gainR, gainD,
    });
    out[plat] = c;
  }
  return out;
}

/**
 * Has enough changed to justify paying to look again?
 *
 * True the first time, and thereafter only once the rival's log price has moved
 * by more than researchDelta. With researchDelta = 0 this is every tick, which
 * is the naive reading of the write-up in a repeated setting.
 */
function worthRechecking(seen: Map<number, number>, id: number, pRival: number, delta: number): boolean {
  if (delta <= 0) return true;
  const last = seen.get(id);
  if (last === undefined) return true;
  return Math.abs(Math.log(pRival) - last) > delta;
}

// ─── Tick ─────────────────────────────────────────────────────────────────────

/**
 * `homeProb` is P(this arrival homes to A). With no shocks it is exactly piR, so
 * the uniform draw below is bit-identical to the previous behaviour. With shocks
 * it becomes Lambda_A/(Lambda_A + Lambda_B), which by Poisson superposition and
 * binomial thinning is an EXACT simulation of two independent per-platform
 * Poisson streams — while keeping one draw, in this position, so the stream is
 * not perturbed.
 */
function spawnRider(s: MutableState, t: number, homeProb: number): void {
  const { config, rng } = s;
  const wtp = rng.logNormal(config.muR, config.sigmaR);
  const defaultPlatform: PlatformId = rng.uniform() < homeProb ? 'A' : 'B';
  const patience = rng.exponential(config.lambdaR);
  const id = s.nextRiderId++;
  const currentPrice = s.platforms[defaultPlatform].price;

  const rejected = wtp < currentPrice;
  const rider: Rider = {
    id, wtp,
    state: rejected ? 'EXITED' : ('QUEUED_' + defaultPlatform) as AgentState,
    defaultPlatform, currentPlatform: rejected ? null : defaultPlatform,
    entryTime: t, queueEntryTime: t, totalWait: 0,
    searchCount: 0, switchCount: 0, matchTime: null,
    transactionPrice: null, exitReason: rejected ? 'price_too_high' : null, patience,
  };
  // Always push to maintain s.riders[id] === rider invariant used throughout the engine
  s.riders.push(rider);

  if (rejected) {
    s.rejectedRiders.push({
      id,
      platform: defaultPlatform,
      queueLen: s.platforms[defaultPlatform].riderQueue.length,
    });
    return;
  }

  s.platforms[defaultPlatform].riderQueue.push(id);
  s.arrivedRiders.add(id);
}

function spawnDriver(s: MutableState, t: number, homeProb: number): void {
  const { config, rng } = s;
  const reservationWage = rng.logNormal(config.muD, config.sigmaD);
  const defaultPlatform: PlatformId = rng.uniform() < homeProb ? 'A' : 'B';
  const patience = rng.exponential(config.lambdaD);
  const id = s.nextDriverId++;
  const currentWage = s.platforms[defaultPlatform].wage;

  const rejected = reservationWage > currentWage;
  const driver: Driver = {
    id, reservationWage,
    state: rejected ? 'EXITED' : ('QUEUED_' + defaultPlatform) as AgentState,
    defaultPlatform, currentPlatform: rejected ? null : defaultPlatform,
    entryTime: t, queueEntryTime: t, totalWait: 0,
    searchCount: 0, switchCount: 0, matchTime: null,
    transactionWage: null, exitReason: rejected ? 'wage_too_low' : null, patience,
  };
  // Always push to maintain s.drivers[id] === driver invariant used throughout the engine
  s.drivers.push(driver);

  if (rejected) {
    s.rejectedDrivers.push({
      id,
      platform: defaultPlatform,
      queueLen: s.platforms[defaultPlatform].driverQueue.length,
    });
    return;
  }

  s.platforms[defaultPlatform].driverQueue.push(id);
  s.arrivedDrivers.add(id);
}

function tick(s: MutableState): void {
  const { config, rng, t } = s;
  advanceShocks(s);

  // Clear per-tick animation sets
  s.switchedRiders = new Set();
  s.switchedDrivers = new Set();
  s.searchedRiders = new Set();
  s.searchedDrivers = new Set();
  s.arrivedRiders = new Set();
  s.arrivedDrivers = new Set();
  s.rejectedRiders = [];
  s.rejectedDrivers = [];

  // Step 1: regional state
  const z = config.surgeSchedule(t);

  // Step 2: effective values (compute once, referenced per agent below)
  const vEff = (r: Rider) => r.wtp * Math.exp(config.betaR * z);
  const sEff = (d: Driver) => d.reservationWage * Math.exp(config.betaD * z);

  // Step 3: current prices/wages
  const pA = s.platforms.A.price;
  const pB = s.platforms.B.price;
  const wA = s.platforms.A.wage;
  const wB = s.platforms.B.wage;

  // Step 4: remove patience-exhausted agents
  for (const rider of s.riders) {
    if (rider.state === 'QUEUED_A' || rider.state === 'QUEUED_B') {
      if (rider.totalWait >= rider.patience) {
        exitRider(s, rider, 'patience_exhausted');
      }
    }
  }
  for (const driver of s.drivers) {
    if (driver.state === 'QUEUED_A' || driver.state === 'QUEUED_B') {
      if (driver.totalWait >= driver.patience) {
        exitDriver(s, driver, 'patience_exhausted');
      }
    }
  }

  // Under the threshold rule, the search cutoffs are computed ONCE per platform
  // per tick, from the pre-move queue state, and every agent's decision is then
  // two float comparisons. Computing them inside the application loop would make
  // each agent's choice depend on how many happened to move before it.
  const threshold = config.searchRule === 'threshold'
                 || config.searchRule === 'threshold-attention';
  const cuts = threshold ? buildTickCutoffs(s, z) : null;
  // Idiosyncratic attention. The draw is taken UNCONDITIONALLY for every queued
  // agent, before any branch, so the random stream depends only on the queue
  // composition — not on where the cutoffs happen to fall. Gating the draw on
  // band membership would make a one-cent move in a cutoff reshuffle every
  // subsequent draw in the run. Under 'bernoulli' and plain 'threshold' no draw
  // is taken at all, so both remain bit-identical to their baselines.
  const attnOn = config.searchRule === 'threshold-attention';

  // Steps 5–8: re-check acceptability, search, compute switches, apply simultaneously
  // Collect decisions before mutating anything
  const riderDecisions: Map<number, { action: 'exit'; reason: ExitReason } | { action: 'switch'; to: PlatformId }> = new Map();
  const driverDecisions: Map<number, { action: 'exit'; reason: ExitReason } | { action: 'switch'; to: PlatformId }> = new Map();

  for (const rider of s.riders) {
    if (rider.state !== 'QUEUED_A' && rider.state !== 'QUEUED_B') continue;
    const plat = rider.currentPlatform!;
    const platRival = rival(plat);
    const pCurr = plat === 'A' ? pA : pB;
    const pRival = plat === 'A' ? pB : pA;
    const ve = vEff(rider);
    const currentOk = pCurr <= ve;
    // Drawn here, for every queued rider, whatever branch is taken below.
    const attn = attnOn ? rng.bernoulli(config.attentionR) : true;

    if (!currentOk && cuts) {
      // Threshold rule: no free check. A dissatisfied rider inside the search
      // band looks and moves if the rival is acceptable; one outside it has
      // decided the expected gain does not cover the cost, and leaves.
      // NOTE the accept/exit screen stays separate from the search screen — an
      // unacceptable agent always leaves the queue, so it can never accumulate
      // at the queue head and stall the matching loop.
      const c = cuts[plat];
      const looks = ve >= c.vMinus && ve <= c.vPlus
        && worthRechecking(s.lastSeenR, rider.id, pRival, config.researchDelta);
      if (looks) {
        rider.searchCount++;
        s.searchedRiders.add(rider.id);
        s.lastSeenR.set(rider.id, Math.log(pRival));
      }
      if (looks && pRival <= ve) {
        riderDecisions.set(rider.id, { action: 'switch', to: platRival });
      } else {
        riderDecisions.set(rider.id, { action: 'exit', reason: 'price_too_high' });
      }
    } else if (!currentOk) {
      // Dissatisfied → free rival check (no Bernoulli cost; push motivation)
      rider.searchCount++;
      s.searchedRiders.add(rider.id);
      if (pRival <= ve) {
        // Rival is acceptable — switch even if not strictly cheaper (escaping a bad price)
        riderDecisions.set(rider.id, { action: 'switch', to: platRival });
      } else {
        riderDecisions.set(rider.id, { action: 'exit', reason: 'price_too_high' });
      }
    } else if (cuts) {
      // Threshold rule. The search set is an interval in WTP: a rider just below
      // the price searches because the rival might be affordable, and a rider far
      // above it does not, because its search cost scales with its own value.
      const c = cuts[plat];
      // attn is the only difference from the plain 'threshold' rule: the band is
      // unchanged, but a rider in it looks only on the ticks when it happens to
      // pick up its phone.
      if (attn && ve >= c.vMinus && ve <= c.vPlus
          && worthRechecking(s.lastSeenR, rider.id, pRival, config.researchDelta)) {
        rider.searchCount++;
        s.searchedRiders.add(rider.id);
        s.lastSeenR.set(rider.id, Math.log(pRival));
        if (pRival < pCurr && pRival <= ve) {
          riderDecisions.set(rider.id, { action: 'switch', to: platRival });
        }
      }
    } else {
      // Satisfied → costly opportunistic search (pull motivation)
      const searches = config.cR > 0 && rng.bernoulli(config.cR);
      if (searches) {
        rider.searchCount++;
        s.searchedRiders.add(rider.id);
        if (pRival < pCurr && pRival <= ve) {
          riderDecisions.set(rider.id, { action: 'switch', to: platRival });
        }
      }
    }
  }

  for (const driver of s.drivers) {
    if (driver.state !== 'QUEUED_A' && driver.state !== 'QUEUED_B') continue;
    const plat = driver.currentPlatform!;
    const platRival = rival(plat);
    const wCurr = plat === 'A' ? wA : wB;
    const wRival = plat === 'A' ? wB : wA;
    const se = sEff(driver);
    const currentOk = wCurr >= se;
    const attn = attnOn ? rng.bernoulli(config.attentionD) : true;

    if (!currentOk && cuts) {
      const c = cuts[plat];
      const looks = se <= c.cPlus
        && worthRechecking(s.lastSeenD, driver.id, wRival, config.researchDelta);
      if (looks) {
        driver.searchCount++;
        s.searchedDrivers.add(driver.id);
        s.lastSeenD.set(driver.id, Math.log(wRival));
      }
      if (looks && wRival >= se) {
        driverDecisions.set(driver.id, { action: 'switch', to: platRival });
      } else {
        driverDecisions.set(driver.id, { action: 'exit', reason: 'wage_too_low' });
      }
    } else if (!currentOk) {
      // Dissatisfied → free rival check
      driver.searchCount++;
      s.searchedDrivers.add(driver.id);
      if (wRival >= se) {
        driverDecisions.set(driver.id, { action: 'switch', to: platRival });
      } else {
        driverDecisions.set(driver.id, { action: 'exit', reason: 'wage_too_low' });
      }
    } else if (cuts) {
      // Threshold rule. The driver's set is a LOWER set, not an interval: the
      // benefit is flat in reservation cost below the current wage while the
      // cost rises with it, so it is the low-cost drivers who shop. There is no
      // driver analogue of the rider's lower cutoff.
      const c = cuts[plat];
      if (attn && se <= c.cPlus
          && worthRechecking(s.lastSeenD, driver.id, wRival, config.researchDelta)) {
        driver.searchCount++;
        s.searchedDrivers.add(driver.id);
        s.lastSeenD.set(driver.id, Math.log(wRival));
        if (wRival > wCurr && wRival >= se) {
          driverDecisions.set(driver.id, { action: 'switch', to: platRival });
        }
      }
    } else {
      // Satisfied → costly opportunistic search
      const searches = config.cD > 0 && rng.bernoulli(config.cD);
      if (searches) {
        driver.searchCount++;
        s.searchedDrivers.add(driver.id);
        if (wRival > wCurr && wRival >= se) {
          driverDecisions.set(driver.id, { action: 'switch', to: platRival });
        }
      }
    }
  }

  // Step 8: apply all decisions simultaneously
  for (const [id, dec] of riderDecisions) {
    const rider = s.riders[id];
    if (rider.state === 'EXITED' || rider.state === 'MATCHED') continue;
    if (dec.action === 'exit') {
      exitRider(s, rider, dec.reason);
    } else {
      const from = rider.currentPlatform!;
      const to = dec.to;
      removeFromQueue(s.platforms[from].riderQueue, id);
      s.platforms[to].riderQueue.push(id);
      rider.state = ('QUEUED_' + to) as AgentState;
      rider.currentPlatform = to;
      // The re-search throttle stores the log price of the rival the agent last
      // looked at. After a switch the rival IS the platform just left — so a
      // retained entry would compare the new rival against a price from a
      // different platform, and deleting it would make the switcher pay again to
      // learn what it already knows. Record the price it just came from, which
      // it observed for free by standing there.
      s.lastSeenR.set(id, Math.log(s.platforms[from].price));
      rider.queueEntryTime = t;
      rider.switchCount++;
      s.switchedRiders.add(id);
    }
  }

  for (const [id, dec] of driverDecisions) {
    const driver = s.drivers[id];
    if (driver.state === 'EXITED' || driver.state === 'MATCHED') continue;
    if (dec.action === 'exit') {
      exitDriver(s, driver, dec.reason);
    } else {
      const from = driver.currentPlatform!;
      const to = dec.to;
      removeFromQueue(s.platforms[from].driverQueue, id);
      s.platforms[to].driverQueue.push(id);
      driver.state = ('QUEUED_' + to) as AgentState;
      driver.currentPlatform = to;
      // As for riders: the wage it just left is known to it for free.
      s.lastSeenD.set(id, Math.log(s.platforms[from].wage));
      driver.queueEntryTime = t;
      driver.switchCount++;
      s.switchedDrivers.add(id);
    }
  }

  // Step 9: matching
  for (const platId of ['A', 'B'] as PlatformId[]) {
    const plat = s.platforms[platId];
    const muMatch = platId === 'A' ? config.muMatchA : config.muMatchB;
    const q = 1 - Math.exp(-muMatch * config.dt);
    const nPairs = Math.min(plat.riderQueue.length, plat.driverQueue.length);
    const matches = rng.binomial(nPairs, q);

    const price = plat.price;
    const wage = plat.wage;

    for (let m = 0; m < matches; m++) {
      const riderId = plat.riderQueue.shift()!;
      const driverId = plat.driverQueue.shift()!;
      const rider = s.riders[riderId];
      const driver = s.drivers[driverId];

      // Invariant check: match only if price ≤ wtp and wage ≥ reservationWage
      const ve = vEff(rider);
      const se = sEff(driver);
      if (price > ve || wage < se) {
        // Re-queue rather than violate invariants
        plat.riderQueue.unshift(riderId);
        plat.driverQueue.unshift(driverId);
        break;
      }

      rider.state = 'MATCHED';
      rider.matchTime = t;
      rider.transactionPrice = price;
      rider.currentPlatform = null;
      rider.totalWait += t - (rider.queueEntryTime ?? 0);

      driver.state = 'MATCHED';
      driver.matchTime = t;
      driver.transactionWage = wage;
      driver.currentPlatform = null;
      driver.totalWait += t - (driver.queueEntryTime ?? 0);

      const rWait = rider.totalWait;
      const dWait = driver.totalWait;

      s.matchRecords.push({
        platform: platId,
        riderId,
        driverId,
        matchTime: t,
        riderWtp: rider.wtp,
        driverReservationWage: driver.reservationWage,
        price,
        wage,
        riderWait: rWait,
        driverWait: dWait,
        riderSurplus: ve - price,
        driverSurplus: wage - se,
        platformRevenue: config['tau' + platId as 'tauA' | 'tauB'] * price,
      });
    }
  }

  // Step 10: record time series
  const cumMatchesA = s.matchRecords.filter(m => m.platform === 'A').length;
  const cumMatchesB = s.matchRecords.filter(m => m.platform === 'B').length;
  const cumRevA = s.matchRecords.filter(m => m.platform === 'A').reduce((a, m) => a + m.platformRevenue, 0);
  const cumRevB = s.matchRecords.filter(m => m.platform === 'B').reduce((a, m) => a + m.platformRevenue, 0);
  const activeR = s.riders.filter(r => r.state === 'QUEUED_A' || r.state === 'QUEUED_B').length;
  const activeD = s.drivers.filter(d => d.state === 'QUEUED_A' || d.state === 'QUEUED_B').length;

  s.timeSeries.push({
    t,
    z,
    pA: s.platforms.A.price,
    pB: s.platforms.B.price,
    wA: s.platforms.A.wage,
    wB: s.platforms.B.wage,
    qRA: s.platforms.A.riderQueue.length,
    qDA: s.platforms.A.driverQueue.length,
    qRB: s.platforms.B.riderQueue.length,
    qDB: s.platforms.B.driverQueue.length,
    cumulativeMatchesA: cumMatchesA,
    cumulativeMatchesB: cumMatchesB,
    cumulativeRevenueA: cumRevA,
    cumulativeRevenueB: cumRevB,
    activeRiders: activeR,
    activeDrivers: activeD,
  });

  // Step 11: update prices
  const eps = config.epsilon;
  for (const platId of ['A', 'B'] as PlatformId[]) {
    const plat = s.platforms[platId];
    const tau = config['tau' + platId as 'tauA' | 'tauB'];
    const eta = config['eta' + platId as 'etaA' | 'etaB'];
    const gamma = config['gamma' + platId as 'gammaA' | 'gammaB'];
    const imbalance = Math.log((plat.riderQueue.length + eps) / (plat.driverQueue.length + eps));
    const logPNew = Math.log(plat.price) + eta * imbalance + gamma * z;
    const pNew = Math.exp(Math.max(Math.log(config.pMin), Math.min(Math.log(config.pMax), logPNew)));
    plat.price = pNew;
    plat.wage = (1 - tau) * pNew;
  }

  // Accumulate wait time for still-queued agents
  for (const rider of s.riders) {
    if (rider.state === 'QUEUED_A' || rider.state === 'QUEUED_B') {
      rider.totalWait += config.dt;
    }
  }
  for (const driver of s.drivers) {
    if (driver.state === 'QUEUED_A' || driver.state === 'QUEUED_B') {
      driver.totalWait += config.dt;
    }
  }

  // Continuous arrivals. Each side draws ONE Poisson at the summed per-platform
  // rate and then homes each arrival on the rate ratio. By Poisson superposition
  // and binomial thinning that is an exact simulation of two independent
  // per-platform Poisson streams, and with no shocks it reduces term-for-term to
  // the previous single-rate draw with homing at piR — so the random stream, the
  // arrival interleaving, and hence FIFO match order are all preserved.
  // Caveat measured in review: rA/total equals piR bitwise for most presets but
  // is up to 0.67 ulp below it for some (e.g. 1.4*0.75/1.4), so a uniform draw
  // landing in that ~1e-16 gap would flip one assignment. ~1e-13 per run.
  const rates = arrivalRates(s, z);
  // `!(x <= 0)` rather than `x > 0`: with x = NaN the latter is false, which
  // skipped the whole block INCLUDING the non-finite check below, so a NaN rate
  // produced a silent run with no arrivals at all instead of the intended throw.
  if (!(config.arrivalRateR <= 0)) {
    const total = rates.rA + rates.rB;
    if (!Number.isFinite(total) || total < 0) {
      throw new Error(`non-finite rider arrival rate: ${rates.rA} + ${rates.rB}`);
    }
    if (total > 0) {
      const nNew = rng.poisson(total * config.dt);
      const pA = rates.rA / total;
      for (let i = 0; i < nNew; i++) spawnRider(s, t, pA);
    }
  }
  if (!(config.arrivalRateD <= 0)) {
    const total = rates.dA + rates.dB;
    if (!Number.isFinite(total) || total < 0) {
      throw new Error(`non-finite driver arrival rate: ${rates.dA} + ${rates.dB}`);
    }
    if (total > 0) {
      const nNew = rng.poisson(total * config.dt);
      const pA = rates.dA / total;
      for (let i = 0; i < nNew; i++) spawnDriver(s, t, pA);
    }
  }

  // Step 12: advance
  s.t += config.dt;

  // Done only at time horizon
  if (s.t >= config.tMax) {
    for (const r of s.riders) {
      if (r.state === 'QUEUED_A' || r.state === 'QUEUED_B') exitRider(s, r, 'simulation_timeout');
    }
    for (const d of s.drivers) {
      if (d.state === 'QUEUED_A' || d.state === 'QUEUED_B') exitDriver(s, d, 'simulation_timeout');
    }
    s.done = true;
  }
}

// ─── Public runner class ──────────────────────────────────────────────────────

/**
 * The search cutoffs a config implies, for display. Uses the same code path as
 * the live tick — deliberately, so the panel can never drift from the engine —
 * with the shock factors pinned at their mean so the readout is stable while a
 * slider is being dragged.
 */
export function previewCutoffs(config: SimConfig, plat: PlatformId): Cutoffs {
  // The liquidity discount is a function of the LIVE queues, and at t=0 those
  // are just the initial cohort — 8 agents in the event scenario — so the
  // transacting-probability ratio is wildly lumpy and the previewed band comes
  // out empty on one platform and absurd on the other. Neither reflects the run.
  // So the preview shows the pure price-based band, and the panel says so.
  const s = initState({ ...config, liquidityDiscount: false });
  s.uR = 0; s.vR = 0; s.uD = 0; s.vD = 0;
  return buildTickCutoffs(s, config.surgeSchedule(0))[plat];
}

export class SimulationRunner {
  private s: MutableState;

  constructor(config: SimConfig) {
    this.s = initState(config);
  }

  reset(config?: SimConfig): void {
    this.s = initState(config ?? this.s.config);
  }

  step(): void {
    if (!this.s.done) tick(this.s);
  }

  get done(): boolean {
    return this.s.done;
  }

  get t(): number {
    return this.s.t;
  }

  snapshot(): SimSnapshot {
    return {
      t: this.s.t,
      z: this.s.config.surgeSchedule(this.s.t),
      platforms: {
        A: { ...this.s.platforms.A, riderQueue: [...this.s.platforms.A.riderQueue], driverQueue: [...this.s.platforms.A.driverQueue] },
        B: { ...this.s.platforms.B, riderQueue: [...this.s.platforms.B.riderQueue], driverQueue: [...this.s.platforms.B.driverQueue] },
      },
      riders: this.s.riders.map(r => ({ ...r })),
      drivers: this.s.drivers.map(d => ({ ...d })),
      matchRecords: [...this.s.matchRecords],
      timeSeries: [...this.s.timeSeries],
      done: this.s.done,
      switchedRiders: new Set(this.s.switchedRiders),
      switchedDrivers: new Set(this.s.switchedDrivers),
      searchedRiders: new Set(this.s.searchedRiders),
      searchedDrivers: new Set(this.s.searchedDrivers),
      arrivedRiders: new Set(this.s.arrivedRiders),
      arrivedDrivers: new Set(this.s.arrivedDrivers),
      rejectedRiders: [...this.s.rejectedRiders],
      rejectedDrivers: [...this.s.rejectedDrivers],
    };
  }

  // Run the full simulation to completion and return snapshot
  runAll(): SimSnapshot {
    while (!this.s.done) tick(this.s);
    return this.snapshot();
  }
}
