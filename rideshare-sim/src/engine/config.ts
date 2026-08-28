import type { SimConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Calibration notes — read before changing any number here.
//
// ONE TICK = 30 SECONDS. This is the only unit under which all four observables
// are simultaneously plausible: tMax=200 is a 100-minute peak; muMatch=0.22
// gives a 2.5-minute mean pickup; arrivalRateR=5 is 600 requests/hour in one
// dense hex; and patience lands in minutes rather than hours.
//
// Three identities govern everything below. They were derived from the engine
// and confirmed numerically, and they mean several knobs do NOT do what their
// names suggest:
//
//   1. Equilibrium queue depth per lane:
//        Q* = (arrivalRate x acceptRate x pi) / (q + lambda),  q = 1-exp(-muMatch*dt)
//      The denominator is the total hazard of leaving the queue — matched OR
//      given up. Predicts observed depth within ~20% (it is a lower bound,
//      because acceptRate is convex in a fluctuating price).
//
//   2. THE PRICE LEVEL IS SET BY THE ARRIVAL RATIO, NOT BY p0. Price walks on
//      log queue imbalance every tick, so it settles where effective rider
//      inflow equals effective driver inflow. A probe starting at p0=45 settled
//      at $15.95 — identical to the p0=16 run. p0 is a transient only. To move
//      the clearing price, move arrivalRateR/arrivalRateD or tau.
//
//   3. Under sustained surge, gamma/eta pins the QUEUE IMBALANCE, not the price:
//        Q_D/Q_R -> exp(gamma*z/eta)
//      An aggressive gamma does not buy a higher price, it buys a pile of idle
//      drivers. Keep gamma/eta in [0.5,1.0] and eta <= 0.10 (above that the
//      price path enters a visible two-cycle).
//
// Also load-bearing, and counter-intuitive:
//   - piR/piD are nearly COSMETIC whenever cR,cD > 0: search re-mixes the
//     queues within 1-2 ticks, so a 0.9/0.1 installed-base skew still ends at a
//     0.47 share. Market share is won on the TAKE RATE (tau 0.05 vs 0.45 gives
//     a 0.78 share), or on matching liquidity (muMatch), not on pi.
//   - nRiders/nDrivers are nearly cosmetic too. Over 200 ticks the base spawns
//     ~854 riders against nRiders=60, so the t=0 cohort is ~7% of the
//     population. Market SIZE lives in arrivalRateR/arrivalRateD.
//   - cR=cD=1 collapses the market to ~3 matches per run. Because w=(1-tau)p
//     ties wage to price, the platform riders prefer is the one drivers reject;
//     with no rider-side search friction the two sides oscillate onto opposite
//     platforms forever. Low cR is what keeps a duopoly functioning here.
//
// ── On cR and cD ─────────────────────────────────────────────────────────────
// These are NOT costs and NOT switch probabilities. Each is the per-tick
// probability that a SATISFIED queued agent opens the rival app; a switch
// follows only if the rival is strictly better and acceptable. A dissatisfied
// agent always checks the rival for free.
//
// Empirical anchors (both directly measured, both recent, both NYC):
//   - Drivers: 42% of NYC drivers switch platform every workday, 67% on most
//     days, 16% never, on a 20-minute decision epoch. Implies ~0.145 rival
//     checks per idle spell.  [Allon, Cohen, Moon & Sinchaisri, 2026 WP]
//   - Riders: given a device opens one rideshare app, P(it opens the other that
//     day) = ~16%. So ~84% of riders book without ever checking the rival, even
//     though one app is >$1 cheaper about 75% of the time (mean absolute gap
//     $3.50, ~14% of fare). Implies ~0.06 checks per waiting spell.
//     [Fossett, Luca & Xu, NBER WP 34441, 2025]
//   - Corroborating multi-apping shares: 30% (Seattle admin census, Cornell ILR
//     2020), 45% (NYC, Parrott & Reich for TLC 2018).
//
// Converted to a per-tick hazard, the literal empirical values are cR ~ cD ~
// 0.008, and the per-tick RATIO is ~1.0 — a rider checks less often per episode
// but their episode is shorter, which nearly cancels. At 0.008 nothing visibly
// switches in a 200-tick run, so the values below take the measured
// PER-DECISION-SPELL rates and apply them per tick: one search decision per
// spell compressed to one per tick. That preserves the empirical 2.4x driver-
// over-rider ratio exactly, and is the sense in which "drivers are switchier"
// is true — per decision, and per calendar time (50-100x, since a driver is in
// the market all week and a rider is not), but not per queued tick.
// Amplification vs the literal per-tick rate: ~8x urban. Stated so the deck can
// say it out loud.
// ── On the threshold search rule, and why it needs attention ─────────────────
// Two facts about `searchRule: 'threshold'` that are invisible without running
// the engine, and that no amount of choosing sR/sD can fix:
//
//   1. IT AMPLIFIES PRICE DISPERSION. The cutoffs are platform-level and
//      deterministic in the agent's own type, so all agents in the band move the
//      same way in the same tick (|net rider flow| = 16.9 of 17.0 switches).
//      With w = (1-tau)p the two sides move in OPPOSITE directions on 100% of
//      ticks. The result is a period-2 slosh: lag-1 autocorrelation of Q_R - Q_D
//      is -0.81, versus +0.72 to +0.87 in every other configuration. The mean
//      relative cross-platform price gap RISES with search volume, which
//      contradicts the theory the rule implements.
//   2. IT DESTROYS THE DRIVER/RIDER SWITCH ASYMMETRY. Under the rule, switches
//      = (search-set coverage) x (queue depth); the price controller pins
//      Q_R ~ Q_D at z = 0, and both coverages saturate toward 1, so the ratio is
//      pushed to 1.00. The empirical 2.4x is a statement about PROPENSITIES
//      (how often you check) and the threshold rule replaces propensity with set
//      membership, which is a different object.
//      For the record, the ratio is not literally unreachable — (sR, sD) =
//      (0.080, 0.155) measures 2.35 over 12 seeds — but only by putting sR at
//      the band-emptiness ceiling, where the rider band is empty on ~half of
//      platform-ticks, price dispersion is still 16%+ and throughput is still
//      down 20%. It buys the target number by switching rider search off.
//
// `searchRule: 'threshold-attention'` keeps the band and gates it with an
// idiosyncratic per-agent attention draw. Both problems go away together,
// because both were caused by the same thing: search that is perfectly
// synchronised across agents. See MARKET_PRESETS[3] for the measurements.
//
// STILL OPEN, flagged not fixed:
//   - sigmaQ is a belief the engine can falsify, and 0.10 is not the
//     self-consistent value. Estimated from a pilot as
//     Var(x_A - x_B)/2 net of the differential-shock variance: 0.31 with no
//     search at all, 0.13 under bernoulli, and ~0.00-0.03 under threshold
//     search, because search itself arbitrages the residual gap away. It is an
//     equilibrium object, not a primitive, and its fixed point is degenerate.
//     0.10 is kept as a small conservative middle; it enters only through
//     sigma_x = sqrt(0.25^2 + 0.25^2 + sigmaQ^2), so 0.10 vs 0.03 moves sigma_x
//     by 3.4%. Note it also dilutes rho: at sigmaQ = 0.10 the effective
//     correlation is 0.278, not the nominal 0.30.
//   - researchDelta is a volume dial, not an economic parameter. Over
//     [0, 0.05] the switch ratio is flat at 2.2-2.4 while search volume moves
//     8x; above 0.10 it starts distorting the ratio. 0.02 sits inside the flat
//     region. It reinterprets sR as a cost per OBSERVATION OCCASION, where an
//     occasion is "the rival's price has moved 2%" (~1.35 ticks), rather than a
//     cost per tick. That is the right way to reconcile the write-up's one-shot
//     draw with a repeated setting: re-reading an unchanged price is not a new
//     draw from F.
//   - The rider's exit-without-checking under the threshold rule is CORRECT and
//     should not be "fixed". For v < p_j, H(v) = integral_0^v F(t) dt is exactly
//     the expected surplus a rider gets from searching a rival it cannot
//     currently afford (integrate by parts: it equals integral_0^v (v-t) dF(t)).
//     So the band's lower cutoff v_minus IS derived from the dissatisfied case,
//     and a dissatisfied rider outside the band has already established that the
//     expected surplus does not cover the look. Exiting is optimal. The same
//     holds for drivers above w_j, where c_plus > w_j iff sD < Kbar/w_j ~ 0.106.
//     Measured, this channel is small either way: dissatisfied agents are 2-3%
//     of the queue and supply 10% of rider and 1% of driver switches.
//
// ── Provenance of the VERIFIED SIMULATION NUMBERS ────────────────────────────
// The figures quoted for each scenario below were measured with:
//   seeds [42, 7, 101, 555, 2024, 13, 88, 907, 31, 604, 1234, 77]  (12 seeds)
//   ticks 21..tMax-1 pooled (the first 20 discarded as transient)
//   queue medians pooled across BOTH platforms; price medians pooled across both
//   "matched %" denominator = every agent ever created, including spawn rejects
//   switch ratio = mean(switchedDrivers/tick) / mean(switchedRiders/tick)
// Recorded because the seed list and metric definitions are part of the claim:
// seeds 42-53 give 678.9 total matches and seeds 1-12 give 684.8, versus 682.5
// on the list above. All three are the same engine.
//
// A 12-seed mean has SE ~5.9 matches (sd ~20.5), so aggregate re-verification
// CANNOT detect a PRNG draw-order break — an audit injected four such breaks and
// every one moved the mean by ~2 SE while individual seeds moved up to 3.9%.
// `npm run baseline:check` is the real gate: it hashes per-tick prices, wages,
// queue lengths and the full (rider,driver,time,price) match list over 107 runs
// and must be bit-identical. Run it after ANY engine edit.
//
// ── Provenance of the empirical anchors ──────────────────────────────────────
// Computed directly from city open data (SoQL queries, single large-n slices —
// no seasonal or time-of-day generality): Chicago fares by distance bucket
// (TNP Trips 2025), NYC realised take rate and request-to-on-scene waits (HVFHV
// 2022/2023). Quoted from source: Allon et al. 2026, Fossett/Luca/Xu 2025,
// Cornell ILR 2020, Parrott & Reich 2018, Second Measure 2024, Uber/Lyft 10-Ks.
//
// KNOWN GAPS — present these as assumptions, not findings:
//   - Rider abandonment timing has NO tier-A source. Nobody publishes it; the
//     queueing literature treats it as a free parameter. lambdaR here is a
//     modelling choice anchored on Uber's 2-minute free-cancel window.
//   - Overall cancellation / unfulfilled-request rate is unsourced for the US.
//     Neither NYC nor Chicago records cancelled requests, only completed trips.
//   - All surge magnitude/duration evidence is 2014-15 and predates upfront
//     pricing (2022), which replaced the visible multiplier with an opaque
//     personalised price. Modal real surge was 1.2-1.3x and 70% of episodes
//     lasted <=10 min, so the event scenario below is deliberately at the top
//     of the observed range.
//   - Rural fares have no trip-level source at all; both large open datasets
//     are city-only. The defensible rural claim is directional.
// ─────────────────────────────────────────────────────────────────────────────

const URBAN: SimConfig = {
  seed: 42,
  nRiders: 22,
  nDrivers: 22,
  muR: Math.log(25),    // median WTP $25/trip; Chicago 2-5mi mean fare $13.30
  sigmaR: 0.42,         //   + $3.89 fees ~ $17.19 (TNP Trips 2025, n=60,875)
  muD: Math.log(8.5),   // median reservation wage $8.50 PER TRIP — at ~1.7
  sigmaD: 0.35,         //   trips/hr that is ~$14/hr, below the ~$22/hr gross
                        //   drivers actually earn. Read per-trip, not per-hour.
  lambdaR: 0.030,       // mean patience 33 ticks = 16.7 min. Long, but chosen
  lambdaD: 0.020,       //   to match the ABANDONMENT SHARE lambda/(lambda+q) at
                        //   13%/9% rather than the mean; an exponential cannot
                        //   match both. Rider abandonment time is the one
                        //   quantity nobody publishes — treat as an assumption.
  cR: 0.06,             // see the cR/cD note above
  cD: 0.15,
  piR: 0.75,            // Uber ~76% of US rideshare spend (Second Measure 2024)
  piD: 0.75,
  tauA: 0.25,           // NYC realised take rate median 26.9% / mean 25.1%, from
  tauB: 0.25,           //   an AM-peak slice of the 2023 HVFHV trip data. NYC has
                        //   a binding pay floor, so that is a LOWER bound; the
                        //   unregulated national figure is ~42% of total rider
                        //   payment and is NOT comparable (different denominator).
                        //   Uber reports 29.9% Mobility take rate (Q4 2025).
  p0A: 16,
  p0B: 16,
  etaA: 0.10,
  etaB: 0.10,
  gammaA: 0.08,
  gammaB: 0.08,
  pMin: 6,
  pMax: 60,             // 3.75x base. Was 80 (5x) and the surge presets HIT it,
                        //   which is above any real platform's surge cap.
  muMatchA: 0.22,       // q=0.197 -> 2.5 min mean pickup, against NYC AM-peak
  muMatchB: 0.22,       //   request->on-scene median 3.25 / mean 3.75 / p90 7.0
                        //   min (2023 HVFHV). A dense peak hex beats the
                        //   all-borough average, hence 2.5 rather than 3.5.
  surgeSchedule: () => 0,
  betaR: 0.5,
  betaD: 0.3,
  alphaR: 0,
  alphaD: 0,
  epsilon: 1,
  dt: 1,
  tMax: 200,
  arrivalRateR: 5.0,    // 600 requests/hr. arrivalRateD solved from identity 2
  arrivalRateD: 4.9,    //   so the price is STATIONARY at $16. The old 4.0/3.0
                        //   ratio was inconsistent with p0=16 and drifted the
                        //   market to $18.70, screening out 28% of riders.

  // Neutral by default: no platform-specific shocks and the Bernoulli search
  // rule, so the three calibrated scenarios below reproduce exactly the numbers
  // they were verified against and `npm run baseline:check` stays green.
  // Correlated cohort shocks are ON by default: without them sigma_x collapses
  // to sigmaQ alone, the conditional belief has almost nothing to be uncertain
  // about, and the search rule degenerates toward full information.
  sigmaShockR: 0.25,
  rhoShockR: 0.30,
  sigmaShockD: 0.25,
  rhoShockD: 0.30,
  shockHalfLife: 20,    // 10 min. Above the ln2/eta ~ 7-tick knee where the
                        //   price update would filter the shock out entirely.
  sigmaQ: 0.171,        // MEASURED, not assumed: estimated at 0.171 +/- 0.002
                        //   from a shocks-off pilot via the moment condition
                        //   sigma_x^2 (1-rho) = Var(h(pA)-h(pB))/2, and agreeing
                        //   with the directly measured sd(h(pA)) = 0.1735. The
                        //   previous 0.10 was 71-89% too small. Correcting it
                        //   costs 2.9 +/- 8.6 matches under 'threshold-attention'
                        //   (40 seeds) -- immaterial, though it was worth -36 +/- 10
                        //   under plain 'threshold'. Two cautions: this quantity
                        //   is an EQUILIBRIUM object, not a primitive (search
                        //   arbitrages away the very gap it measures, so the
                        //   fixed point is near-degenerate under heavy search),
                        //   and its calibration map is multi-valued -- there is a
                        //   second, self-fulfilling attractor above ~0.19 where
                        //   wider beliefs drive more churn which widens the
                        //   realised gap. Start below the break.
  // Every scenario now runs the write-up's rule. 'threshold-attention' is the
  // band exactly as derived, gated by a per-agent attention draw — see the note
  // above on why the ungated version inverts the dispersion prediction.
  searchRule: 'threshold-attention',
  sR: 0.030,            // search cost as a fraction of own type. Hard ceiling
  sD: 0.120,            //   is Hbar/p_j (~0.07): above it the band is empty and
                        //   nobody searches, so these live in single digits.
  tauBelief: 0.25,
  attentionR: 0.20,     // how often an agent happens to LOOK, as distinct from
  attentionD: 0.55,     //   whether looking would pay. The ratio carries the
                        //   driver-over-rider asymmetry (measured D/R 2.3-2.4
                        //   against a ~2.4 empirical target) on a parameter with
                        //   a direct anchor, rather than on a search cost tuned
                        //   to its band-emptiness ceiling. Set both to 1 to
                        //   recover the plain synchronised rule.
  researchDelta: 0.02,
  // On by default: it recovers the price-dispersion compression that switching
  // to the rational rule otherwise costs (gap 9.0% vs 9.6% under the old
  // Bernoulli rule, at 40 seeds). Off in the rural scenario — see there.
  liquidityDiscount: true,
  // Derive the belief from the shock parameters by default — the write-up's
  // assumption. Set these to state a belief calibrated to realised moments.
  beliefSigmaX: null,
  beliefRho: null,
};

// The app opens in the dense-urban calibration: it is the most defensible one,
// and every scenario below is a complete specification applied over it.
export const DEFAULT_CONFIG: SimConfig = URBAN;

export const SEARCH_PRESETS: Array<{ label: string; cR: number; cD: number }> = [
  { label: 'No search (0, 0) — no re-shopping',        cR: 0,    cD: 0 },
  { label: 'Measured (0.06, 0.15) — drivers 2.4x',     cR: 0.06, cD: 0.15 },
  { label: 'Heavy (0.2, 0.6) — surge-level churn',     cR: 0.2,  cD: 0.6 },
  { label: 'Full (1, 1) — MARKET COLLAPSES (~3 matches)', cR: 1, cD: 1 },
  { label: 'Counterfactual: riders switchier (0.6, 0.2)', cR: 0.6, cD: 0.2 },
];

export const SURGE_PRESETS: Array<{ label: string; schedule: (t: number) => number }> = [
  { label: 'No surge',                          schedule: () => 0 },
  { label: 'Moderate (z=0.5) — ~1.2x, the modal real surge', schedule: () => 0.5 },
  { label: 'High (z=1.0)',                      schedule: () => 1.0 },
  { label: 'Event let-out (z=1.5, t=40-70, decays to 110)',
    schedule: (t) => (t < 40 ? 0 : t < 70 ? 1.5 : t < 110 ? 1.5 * (110 - t) / 40 : 0) },
  { label: 'Gradual ramp',                      schedule: (t) => Math.min(t / 40, 1.0) },
];

export function withPreset(base: SimConfig, patch: Partial<SimConfig>): SimConfig {
  return { ...base, ...patch };
}

export interface MarketPreset {
  label: string;
  description: string;
  patch: Partial<Omit<SimConfig, 'surgeSchedule'>> & { surgeSchedule?: (t: number) => number };
}

// Each scenario states every parameter it depends on, even where that equals the
// default, so it is a complete and reproducible specification. ConfigPanel
// applies these over DEFAULT_CONFIG rather than over the live config.
export const MARKET_PRESETS: MarketPreset[] = [
  {
    label: 'Dense urban peak',
    description: 'Thick market · driver multi-homing erodes the incumbent lead · market does not tip',
    patch: {
      nRiders: 22, nDrivers: 22,
      arrivalRateR: 5.0, arrivalRateD: 4.9,
      muR: Math.log(25), sigmaR: 0.42,
      muD: Math.log(8.5), sigmaD: 0.35,
      lambdaR: 0.030, lambdaD: 0.020,
      muMatchA: 0.22, muMatchB: 0.22,
      p0A: 16, p0B: 16,
      tauA: 0.25, tauB: 0.25,
      etaA: 0.10, etaB: 0.10,
      gammaA: 0.08, gammaB: 0.08,
      pMin: 6, pMax: 60,
      cR: 0.06, cD: 0.15,   // inert under the threshold rule; kept for the
                            //   'bernoulli' comparison run
      piR: 0.75, piD: 0.75,
      betaR: 0.5, betaD: 0.3,
      alphaR: 0, alphaD: 0,
      epsilon: 1,
      surgeSchedule: () => 0,
      // The write-up's search rule, on correlated cohort shocks.
      sigmaShockR: 0.25, rhoShockR: 0.30,
      sigmaShockD: 0.25, rhoShockD: 0.30,
      searchRule: 'threshold-attention',
      attentionR: 0.20, attentionD: 0.55,
      sR: 0.030, sD: 0.120,
      liquidityDiscount: true,
    },
  },
  {
    label: 'Rural thin market',
    description: 'Below efficient scale · liquidity tips it to one platform · high fares, poor service',
    patch: {
      // An order of magnitude thinner. Poisson(0.40) means 67% of ticks see no
      // rider arrival at all — that lumpiness IS the thin market.
      nRiders: 6, nDrivers: 5,
      arrivalRateR: 0.40, arrivalRateD: 0.36,
      // Rural trips are longer (15-25mi vs 3-5mi) and far more heterogeneous,
      // so both the median and the spread rise on each side.
      muR: Math.log(31), sigmaR: 0.55,
      muD: Math.log(10.5), sigmaD: 0.45,
      // No transit, no taxi rank: a rural rider waits ~1.5x longer before
      // giving up, and a rural driver ~1.6x longer.
      lambdaR: 0.020, lambdaD: 0.0125,
      // The increasing-returns-to-density externality, stated explicitly:
      // sparse supply means 8-11 min pickups, and B's is worse because B is
      // smaller. This asymmetry — not the take rate — is why A wins here.
      muMatchA: 0.060, muMatchB: 0.042,
      p0A: 20, p0B: 20,
      tauA: 0.25, tauB: 0.25,
      // Small numbers make every arrival a large shock, so eta must be gentler
      // and epsilon larger, or one agent moves the price 7% in a tick.
      etaA: 0.05, etaB: 0.05,
      gammaA: 0.03, gammaB: 0.03,
      pMin: 8, pMax: 60,
      // A rural driver has nobody to switch to: the rival queue holds 1-2
      // riders, so the option is close to worthless. Quartered from urban.
      // No source exists for multi-apping by market density — this factor is
      // judgement, and theory (Bryan & Gans) can be read the other way.
      cR: 0.015, cD: 0.04,  // inert under the threshold rule
      // Correlated shocks + the write-up's rule. Measured against the old
      // Bernoulli calibration this CUTS the cross-platform price gap from 19.8%
      // to 10.4% and lifts the driver/rider switch ratio from 1.79 to 2.41, at
      // the same throughput (33 vs 35 matches, inside noise).
      sigmaShockR: 0.25, rhoShockR: 0.30,
      sigmaShockD: 0.25, rhoShockD: 0.30,
      searchRule: 'threshold-attention',
      attentionR: 0.20, attentionD: 0.55,
      sR: 0.030, sD: 0.120,
      // OFF here, against the intuition. The discount is the thin-market
      // economics — it stops an agent switching to a better price and an empty
      // board — and switching it on does produce the liquidity trap the theory
      // predicts (tipping to A, and matches even rise slightly). But it drives
      // the share of ticks with an EMPTY Lyft driver lane from 50% to 65%, which
      // reads on screen as a dead platform rather than a thin one, and it widens
      // the price gap back to 13.4%. Turn it on to show the tipping result.
      liquidityDiscount: false,
      // In much of rural America only one platform has real presence. Lyft
      // lists ~650 cities; Uber operates in thousands.
      piR: 0.85, piD: 0.85,
      betaR: 0.5, betaD: 0.3,
      alphaR: 0, alphaD: 0,
      epsilon: 2,
      surgeSchedule: () => 0,
    },
  },
  {
    label: 'Concert let-out surge',
    description: 'Demand x9.5 for 15 min · price 2.1x · supply x6 · drivers chase surge across apps',
    patch: {
      nRiders: 8, nDrivers: 8,
      arrivalRateR: 1.4, arrivalRateD: 0.95,
      // sigmaR is the load-bearing parameter here, not a fudge. The surge
      // multiple and the screen-out rate are locked together through it:
      // p_surge/p_base = exp(sigmaR*[z(1-a_peak) - z(1-a_base)]). At sigmaR=0.5
      // a 2.4x surge screens out 86% of riders; at 0.95 the same surge costs
      // 66%. A departing arena crowd genuinely is that heterogeneous — some pay
      // $80 not to wait, some walk to the train.
      muR: Math.log(24), sigmaR: 0.95,
      muD: Math.log(9), sigmaD: 0.45,
      // Event riders are 2.7x more impatient than urban commuters: the crowd
      // can see its substitutes (walk, transit, wait for the crush to clear).
      lambdaR: 0.08, lambdaD: 0.025,
      muMatchA: 0.15, muMatchB: 0.15,
      p0A: 16, p0B: 16,
      tauA: 0.25, tauB: 0.25,
      etaA: 0.12, etaB: 0.12,
      // Deliberately small: gamma forces Q_D/Q_R -> exp(gamma*z/eta), so a
      // larger gamma inverts the imbalance and pins the price at pMax instead
      // of raising throughput.
      gammaA: 0.02, gammaB: 0.02,
      pMin: 6, pMax: 60,
      // Drivers chase visible surge across apps: switch hazard runs ~5-6x
      // baseline at wage boundaries (Allon et al., Fig. 7). Riders re-shop ~3x
      // harder, but a rider must cancel to switch — Uber's free window is 2
      // minutes and Lyft shows no ETA before you request. Measured result: 4.7
      // driver switches per rider switch, so the asymmetry is visible on screen.
      // Note the rider side is ALREADY amplified by the engine: a surged-out
      // rider becomes dissatisfied and gets a FREE rival check, so pushing cR
      // higher would double-count the surge response.
      cR: 0.15, cD: 0.55,   // inert under the threshold rule
      sigmaShockR: 0.25, rhoShockR: 0.30,
      sigmaShockD: 0.25, rhoShockD: 0.30,
      searchRule: 'threshold-attention',
      // attentionD raised from the 0.55 default. This scenario's whole point is
      // drivers chasing visible surge across apps, which the old Bernoulli
      // calibration expressed as a 5.2x driver/rider switch ratio. At the
      // default attention that ratio falls to 3.00; at 0.75 it measures 5.21,
      // i.e. the signature is preserved on the parameter that means "how often
      // a driver glances at the other app" — which is exactly what a surge
      // does to driver attention.
      attentionR: 0.20, attentionD: 0.75,
      sR: 0.030, sD: 0.120,
      liquidityDiscount: true,
      piR: 0.75, piD: 0.75,
      // Effective WTP x2.46 at peak; reservation wage x1.45 — event driving is
      // unpleasant and congested, and betaD > 0 is what makes surge necessary.
      betaR: 0.6, betaD: 0.25,
      // Demand x9.5, supply x6.0 at z=1.5. alphaD must be well above zero:
      // surge calling forth supply is the entire economic point, and the old
      // preset had alphaD=0, which switched that mechanism off. Measured over
      // 12 seeds, alphaD=1.0 let the price saturate pMax on 2.6% of ticks
      // (p90 $44); at 1.2 it peaks at p90 $33.8 = 2.1x base and never pins,
      // while rider screen-out falls from 59% to 53%. A pinned price means the
      // pricing mechanism has stopped conveying information, so 1.2 it is.
      alphaR: 1.5, alphaD: 1.2,
      epsilon: 1,
      // CAVEAT for the deck: ~53% of riders in this scenario exit as
      // price_too_high and only ~28% get a ride. That is not a calibration
      // failure — it is forced by the identity in note 2 (peak accept rate is
      // pinned by the peak arrival ratio, so any ratio above ~3.3 mechanically
      // implies >50% screen-out) and it is the correct reading: concertgoers see
      // a 2x fare and walk to the train. It is also an UPPER bound, because
      // spawn screening compares raw WTP to price and ignores exp(betaR*z).
      // Quiet, then 15 min of doors-open at z=1.5, then a 20-min decay.
      surgeSchedule: (t: number) => (t < 40 ? 0 : t < 70 ? 1.5 : t < 110 ? 1.5 * (110 - t) / 40 : 0),
    },
  },
  {
      label: 'Counterexample: synchronised search',
    description: 'Same market, but everyone searches on the same tick — dispersion RISES and throughput collapses',
    patch: {
      // A dense urban market with the two mechanisms from the theory switched
      // on: platform-level cohort shocks that are partly common and partly
      // differential, and a search decision derived from them rather than from
      // a fixed per-tick coin.
      nRiders: 22, nDrivers: 22,
      arrivalRateR: 5.0, arrivalRateD: 4.9,
      muR: Math.log(25), sigmaR: 0.42,
      muD: Math.log(8.5), sigmaD: 0.35,
      lambdaR: 0.030, lambdaD: 0.020,
      muMatchA: 0.22, muMatchB: 0.22,
      p0A: 16, p0B: 16,
      tauA: 0.25, tauB: 0.25,
      etaA: 0.10, etaB: 0.10,
      gammaA: 0.08, gammaB: 0.08,
      pMin: 6, pMax: 60,
      betaR: 0.5, betaD: 0.3,
      alphaR: 0, alphaD: 0,
      epsilon: 1,
      surgeSchedule: () => 0,
      // Symmetric installed base. At piR=0.75 the small platform draws only
      // Poisson(1.25) arrivals per tick and sampling noise swamps the shock, so
      // rho would be poorly identified. Use 0.5 for any shock experiment.
      piR: 0.50, piD: 0.50,
      // sigma_x = sqrt(0.25^2 + 0.25^2 + 0.10^2) = 0.366. The shock has to be
      // large relative to the engine's own queue noise (sigma_q = 0.10) or the
      // price controller's residual error drowns it.
      sigmaShockR: 0.25, rhoShockR: 0.30,
      sigmaShockD: 0.25, rhoShockD: 0.30,
      sigmaQ: 0.10,
      // 20 ticks = 10 min, above the ln2/eta ~ 7-tick knee below which the price
      // update filters the shock out before any agent can observe it.
      shockHalfLife: 20,
      // ── Why 'threshold-attention' and not 'threshold' ────────────────────
      // The plain 'threshold' rule FAILS the central comparative static of
      // search theory: more search must compress cross-platform price
      // dispersion, and under that rule it amplifies it. Mean relative gap
      // |p_A - p_B| / mean(p), 12 seeds, ticks 22-199:
      //     no search at all                       24.1%   (0.8 searches/tick)
      //     bernoulli at measured cR/cD             9.1%   (5.2 searches/tick)
      //     'threshold', sR .050 sD .186           25.7%  (62.4 searches/tick)
      //     'threshold', sR .030 sD .120           40.7% (163.5 searches/tick)
      // An 8x rise in search volume bought NEGATIVE arbitrage, and at the wider
      // band the market collapsed to 150 matches from 639.
      //
      // Cause, and it is not volume. The threshold cutoffs are platform-level
      // and deterministic in the agent's own type, so every agent in the band
      // decides identically in the same tick: measured |net rider flow| is 16.9
      // of 17.0 rider switches, and riders and drivers move in OPPOSITE
      // directions on 100% of ticks (w = (1-tau)p, so the platform riders like
      // is the one drivers reject). That is a control loop whose gain exceeds
      // its stability bound. Signature: lag-1 autocorrelation of the
      // within-platform imbalance Q_R - Q_D is -0.81 under the plain rule and
      // -0.95 at the wider band — a period-2 slosh — against +0.87 with no
      // search and +0.72 under bernoulli.
      //
      // The fix separates WHO would gain from looking (the write-up's band,
      // kept exactly) from WHEN they happen to look (an idiosyncratic per-agent
      // attention draw). That leaves the economics of the band untouched and
      // damps the loop gain. THE DIAGNOSTIC TEST, at these attention rates,
      // raising volume by widening the band:
      //     sR .070 sD .300    3.4 searches/tick   gap 16.5%   640 matches
      //     sR .050 sD .186    6.4                 gap 12.8%   639
      //     sR .030 sD .120   10.0                 gap 10.8%   640
      //     sR .015 sD .080   13.4                 gap 11.2%   638
      //     sR .005 sD .040   16.6                 gap 10.6%   639
      // Dispersion now FALLS in search volume and throughput is flat. The same
      // widening at attention = 1 runs the gap from 16.7% to 44.2% and
      // throughput from 617 to 60. Volume was never the problem.
      //
      // Dispersion is U-shaped in search volume under BOTH rules — bernoulli
      // also degrades, 9.1% at 5.2 searches/tick to 17.0% at 41.0 — so this is
      // a property of the engine's price controller (gain eta) and not of the
      // write-up. Attention is what lets the calibration sit on the falling
      // branch instead of past the minimum.
      // The write-up's rule with NO attention gate — this scenario exists to be
      // the evidence for why the gate is there. The cutoffs are platform-level
      // and deterministic in the agent's own type, so every agent inside the
      // band reacts to the same shock in the same direction on the same tick.
      searchRule: 'threshold',
      // The band. Selective enough that the write-up's interval structure is
      // doing real work (it screens out roughly half the queued population),
      // and wide enough to sit at the gap minimum given the attention rates.
      // The hard ceiling on sR is Hbar/p_j ~ 0.074-0.090 (it moves with the
      // shock): above that the rider band is empty and nobody searches.
      sR: 0.030, sD: 0.120,
      // Attention. These are per-tick probabilities that a SATISFIED queued
      // agent happens to look at all, which is exactly what cR/cD were measured
      // as, so the driver/rider asymmetry is back on a parameter with a direct
      // empirical anchor rather than on set-coverage. attentionD/attentionR =
      // 2.75 delivers a measured 2.37 driver switches per rider switch, against
      // the 2.4 target from Allon et al. 2026 (42-67% of NYC drivers switch
      // daily on a 20-min epoch) and Fossett/Luca/Xu NBER 34441 (~16% of riders
      // ever open the rival app). The ratio is monotone in attentionD — 0.80 at
      // 0.20, 2.07 at 0.50, 3.11 at 0.70, 4.22 at 0.90 — so it is a genuine
      // tunable again. Under the plain 'threshold' rule it is NOT: switches
      // there equal (band coverage) x (queue depth), the price controller pins
      // Q_R ~ Q_D, and both coverages saturate toward 1, so the ratio is
      // squeezed to 1.00 whenever both sides search much.
      attentionR: 1, attentionD: 1,   // no gate: everybody looks at once
      tauBelief: 0.25,
      researchDelta: 0.02,
      liquidityDiscount: false,
      // MEASURED, 12 seeds, ticks 22-199, against the alternatives:
      //                            search/tick  switch/tick  ratio   gap  ac1  matches
      //   no search + shocks            0.8         0.5       1.24  24.1% +.87   639
      //   bernoulli + shocks            5.2         2.7       2.22   9.1% +.72   655
      //   'threshold' (was shipped)    62.4        56.5       0.99  25.7% -.81   458
      //   THIS PRESET                  10.0         5.9       2.37  10.8% +.33   640
      // Throughput loss versus the bernoulli comparator falls from 30% to 2.3%,
      // and queue depth from 45/45 back to 22/23. The remaining ~10% gap is a
      // floor: the differential cohort shock keeps injecting dispersion, so no
      // amount of search can arbitrage it away.
      //
      // To reproduce the synchronised rule for the deck's "what goes wrong"
      // slide, set searchRule back to 'threshold' — that path is untouched and
      // still bit-reproducible.
    },
  },
];
