export type AgentState = 'UNASSIGNED' | 'QUEUED_A' | 'QUEUED_B' | 'MATCHED' | 'EXITED';
export type PlatformId = 'A' | 'B';
export type ExitReason =
  | 'price_too_high'
  | 'wage_too_low'
  | 'patience_exhausted'
  | 'no_acceptable_platform'
  | 'simulation_timeout';

export interface Rider {
  id: number;
  wtp: number;
  state: AgentState;
  defaultPlatform: PlatformId;
  currentPlatform: PlatformId | null;
  entryTime: number;
  queueEntryTime: number | null;
  totalWait: number;
  searchCount: number;
  switchCount: number;
  matchTime: number | null;
  transactionPrice: number | null;
  exitReason: ExitReason | null;
  patience: number;
}

export interface Driver {
  id: number;
  reservationWage: number;
  state: AgentState;
  defaultPlatform: PlatformId;
  currentPlatform: PlatformId | null;
  entryTime: number;
  queueEntryTime: number | null;
  totalWait: number;
  searchCount: number;
  switchCount: number;
  matchTime: number | null;
  transactionWage: number | null;
  exitReason: ExitReason | null;
  patience: number;
}

export interface MatchRecord {
  platform: PlatformId;
  riderId: number;
  driverId: number;
  matchTime: number;
  riderWtp: number;
  driverReservationWage: number;
  price: number;
  wage: number;
  riderWait: number;
  driverWait: number;
  riderSurplus: number;
  driverSurplus: number;
  platformRevenue: number;
}

export interface PlatformState {
  price: number;
  wage: number;
  riderQueue: number[];  // rider IDs, FIFO
  driverQueue: number[]; // driver IDs, FIFO
}

export interface TimeSeriesPoint {
  t: number;
  z: number;
  pA: number; pB: number;
  wA: number; wB: number;
  qRA: number; qDA: number;
  qRB: number; qDB: number;
  cumulativeMatchesA: number;
  cumulativeMatchesB: number;
  cumulativeRevenueA: number;
  cumulativeRevenueB: number;
  activeRiders: number;
  activeDrivers: number;
}

export interface SimSnapshot {
  t: number;
  z: number;
  platforms: { A: PlatformState; B: PlatformState };
  riders: Rider[];
  drivers: Driver[];
  matchRecords: MatchRecord[];
  timeSeries: TimeSeriesPoint[];
  done: boolean;
  // IDs that switched or arrived this tick — for animation
  switchedRiders: Set<number>;
  switchedDrivers: Set<number>;
  // Agents that paid the search cost this tick and looked at the rival offer,
  // whether or not they went on to switch. They stay in their queue.
  searchedRiders: Set<number>;
  searchedDrivers: Set<number>;
  arrivedRiders: Set<number>;
  arrivedDrivers: Set<number>;
  // Agents rejected at spawn (price > WTP or wage < reservation) — fly in then break apart
  rejectedRiders: Array<{ id: number; platform: PlatformId; queueLen: number }>;
  rejectedDrivers: Array<{ id: number; platform: PlatformId; queueLen: number }>;
}

export interface SimConfig {
  seed: number;
  nRiders: number;
  nDrivers: number;
  muR: number;
  sigmaR: number;
  muD: number;
  sigmaD: number;
  lambdaR: number;
  lambdaD: number;
  cR: number;
  cD: number;
  piR: number;
  piD: number;
  tauA: number;
  tauB: number;
  p0A: number;
  p0B: number;
  etaA: number;
  etaB: number;
  gammaA: number;
  gammaB: number;
  pMin: number;
  pMax: number;
  muMatchA: number;
  muMatchB: number;
  surgeSchedule: (t: number) => number;
  betaR: number;
  betaD: number;
  alphaR: number;
  alphaD: number;
  epsilon: number;
  dt: number;
  tMax: number;
  // Continuous arrivals (agents per tick, Poisson)
  arrivalRateR: number;
  arrivalRateD: number;

  // ── Correlated platform shocks ─────────────────────────────────────────────
  // Per-platform cohort shocks: one common factor and one differential factor
  // carried with opposite signs across the platforms,
  //   a_A = s1*u + s2*v ,  a_B = s1*u - s2*v
  // so that sigma^2 = s1^2 + s2^2 and rho = (s1^2 - s2^2)/(s1^2 + s2^2), and
  //   s1 = sigma*sqrt((1+rho)/2),  s2 = sigma*sqrt((1-rho)/2).
  // rho = +1 is a purely common shock (both platforms move together, so there
  // is no relative price dispersion and search is worthless); rho = 0 maximises
  // the conditional uncertainty that makes search valuable.
  // Set sigma = 0 for a market with no platform-specific shocks at all.
  sigmaShockR: number;      // sd of the rider-side cohort log-shock
  rhoShockR: number;        // its cross-platform correlation, in (-1,1)
  sigmaShockD: number;      // driver side
  rhoShockD: number;
  shockHalfLife: number;    // ticks for a shock to decay by half. Must clear
                            //   ln2/eta (~7 ticks) or the price update, which is
                            //   an integrator with time constant 1/eta, filters
                            //   the shock out before any agent can observe it.
  // Residual dispersion: even with no shocks the engine's own queues are
  // Poisson/binomial random, so the two prices differ. An agent who believed
  // otherwise would hold a belief the engine falsifies, so this is added into
  // sigma_x for the search rule only. It is independent across platforms and so
  // contributes nothing to the covariance.
  sigmaQ: number;

  // ── Search rule ────────────────────────────────────────────────────────────
  // 'bernoulli' — a satisfied agent checks the rival with probability cR/cD per
  //   tick, and a dissatisfied one gets a free check. This is the rule the
  //   measured calibration was done against.
  // 'threshold' — the write-up's rule: an agent pays a search cost proportional
  //   to its own type, so riders search iff their WTP lies in an interval and
  //   drivers iff their reservation cost is below a cutoff. The free check is
  //   REMOVED under this rule (it double-counts, and is wrong on both margins).
  // 'threshold-attention' — the threshold rule's BAND, gated by an idiosyncratic
  //   per-agent attention draw. See the note on attentionR/attentionD: the plain
  //   'threshold' rule is synchronised (every agent in the band moves the same
  //   way in the same tick), which makes cross-platform price dispersion RISE
  //   with search volume — the opposite of what search theory predicts. This
  //   rule separates WHO would search (the band, from the write-up) from WHEN
  //   they look (the attention hazard, which is idiosyncratic).
  searchRule: 'bernoulli' | 'threshold' | 'threshold-attention';
  sR: number;               // rider search cost as a fraction of own WTP.
                            //   Must be below Hbar/p_j (~0.07) or nobody
                            //   searches at all — this lives in single digits.
  sD: number;               // driver search cost as a fraction of own res. cost
  tauBelief: number;        // the take rate agents ASSUME when inverting the
                            //   rival's price, held fixed under a deviation so
                            //   a tau experiment is not seen through instantly
  // ── Idiosyncratic attention (searchRule 'threshold-attention' only) ────────
  // Per-tick probability that a SATISFIED queued agent happens to look at all.
  // Under the plain 'threshold' rule this is implicitly 1: the search set is a
  // deterministic function of (own type, own platform's price), so every agent
  // in the band searches in the same tick and switches in the same direction —
  // a synchronised stampede. Measured signature: |net flow| is 16.9 of 17.0
  // rider switches per tick, and the mean relative cross-platform price gap is
  // 23.2% at 42 searches/tick versus 9.1% under the Bernoulli rule at 5.2
  // searches/tick and 24.1% with no search at all. Dispersion is U-SHAPED in
  // search volume, and attention = 1 puts the write-up's rule far on the wrong
  // side of the minimum, because it buys the maximum flow per unit of search.
  //
  // Separating the two restores the empirical content of both parameters:
  //   sR/sD          select WHO would gain from looking (the write-up's band)
  //   attentionR/D   how OFTEN a given agent happens to look
  // and the attention rates are exactly what cR/cD were measured as — the
  // per-tick probability of opening the rival app — so the driver/rider
  // asymmetry becomes parametric again through attentionD/attentionR.
  //
  // A DISSATISFIED agent is exempt: its own platform is unacceptable right now,
  // so it is looking by construction, and gating it would force it to exit
  // unchecked. Dissatisfied agents are only ~3% of the queue, so this leaves
  // essentially all of the synchronisation damped.
  attentionR: number;
  attentionD: number;
  researchDelta: number;    // re-search only once the rival's log price has
                            //   moved by this much. The write-up's search is
                            //   one-shot; the engine re-evaluates every tick, so
                            //   without this a searcher pays every tick of its
                            //   spell and counts inflate ~5x. 0 = every tick.
  // Scale the option value by the chance of actually transacting on each side.
  // Without it an agent switches to a platform with a better price and no
  // counterparties: in the rural calibration Lyft has zero drivers on 30% of
  // ticks, and on a third of the ticks where it is the cheaper option. Off is
  // faithful to the write-up, which is static and has no queues.
  liquidityDiscount: boolean;

  // ── Belief vs data-generating process ──────────────────────────────────────
  // The write-up assumes rational expectations: agents know the distribution of
  // x = log(A/B), and the price reveals it exactly. Measured against this engine
  // that identification FAILS — the eta=0.10 price integrator passes through
  // only ~52% of the arrival-rate ratio at a one-tick lag (R^2 = 0.18), the
  // realised cross-platform correlation is 0.056 rather than the nominal 0.278,
  // and the realised loading on own price is NEGATIVE (-0.224) because queue
  // noise is zero-sum across platforms. Sharpening the signal by raising eta is
  // not available: above 0.10 the price path two-cycles.
  //
  // So the belief is separated from the DGP here rather than silently conflated.
  //   null   = derive the belief from the shock parameters (the write-up's
  //            rational-expectations assumption, which this engine falsifies)
  //   number = state the belief directly, e.g. calibrated to realised moments
  beliefSigmaX: number | null;
  beliefRho: number | null;

}

export interface AgentEvent {
  riderId?: number;
  driverId?: number;
  type: 'switch' | 'match' | 'arrive' | 'exit';
}
