// oxlint-disable no-loss-of-precision
//   The Cody rational-approximation coefficients below are published to 18
//   significant digits, one more than a double holds, so each literal rounds at
//   the 1e-17 level. That is intended and harmless — Phi is verified accurate to
//   2e-16 against exact reference values in scripts/verify-search.mts. Suppressed
//   at file level so the 36 resulting warnings cannot mask a real one.
// ─────────────────────────────────────────────────────────────────────────────
// Search-theoretic cutoffs.
//
// Implements the threshold search rule: an agent pays a search cost proportional
// to its own type to observe the rival platform's price, and does so only when
// the expected benefit covers that cost. The rider's search set is an INTERVAL
// in willingness-to-pay and the driver's is a lower set in reservation cost.
//
// The whole point is that the cutoffs depend only on the platform's state, never
// on the individual agent — so the expensive work runs a fixed number of times
// per tick per platform, and the per-agent test is two float comparisons.
//
// Notation, following the write-up this implements:
//   x        = log(A/B), the log ratio of cohort masses on a platform
//   h(p)     = log G_C((1-tau)p) - log[1 - F_V(p)],  strictly increasing, so
//              observing p reveals x exactly:  x = h(p)
//   F_{i|j}  = Phi( (h(p) - m) / s ),  m = mu_x + rho(h(p_j) - mu_x),
//              s = sigma_x sqrt(1 - rho^2)
//   Hbar     = integral_0^{p_j} F_{i|j}      rider option value at v >= p_j
//   Ktilde   = integral_{p_j}^inf (1 - F_{i|j})   driver option value, pre-(1-tau)
// ─────────────────────────────────────────────────────────────────────────────

const SQRT2 = Math.SQRT2;
const LOG_SQRT_2PI = 0.9189385332046727;   // log(sqrt(2*pi))
const SQRPI = 5.6418958354775628695e-1;    // 1/sqrt(pi)

// ── erfcx(x) = exp(x^2) * erfc(x), for x >= 0 ────────────────────────────────
// Cody's rational Chebyshev approximation (ACM Algorithm 715, CALERF). This is
// the right primitive because the exp(-x^2) is factored OUT: erfcx neither
// overflows nor underflows, so the log-domain path below never has to evaluate
// an exp that would flush to zero.
const CA = [3.16112374387056560e0, 1.13864154151050156e2, 3.77485237685302021e2,
            3.20937758913846947e3, 1.85777706184603153e-1];
const CB = [2.36012909523441209e1, 2.44024637934444173e2, 1.28261652607737228e3,
            2.84423683343917062e3];
const CC = [5.64188496988670089e-1, 8.88314979438837594e0, 6.61191906371416295e1,
            2.98635138197400131e2, 8.81952221241769090e2, 1.71204761263407058e3,
            2.05107837782607147e3, 1.23033935479799725e3, 2.15311535474403846e-8];
const CD = [1.57449261107098347e1, 1.17693950891312499e2, 5.37181101862009858e2,
            1.62138957456669019e3, 3.29079923573345963e3, 4.36261909014324716e3,
            3.43936767414372164e3, 1.23033935480374942e3];
const CP = [3.05326634961232344e-1, 3.60344899949804439e-1, 1.25781726111229246e-1,
            1.60837851487422766e-2, 6.58749161529837803e-4, 1.63153871373020978e-2];
const CQ = [2.56852019228982242e0, 1.87295284992346047e0, 5.27905102951428412e-1,
            6.05183413124413191e-2, 2.33520497626869185e-3];

function erfcxPos(y: number): number {
  if (y <= 0.46875) {
    // Small argument: compute erf by its own rational form, then scale up.
    const z = y * y;
    let xnum = CA[4] * z, xden = z;
    for (let i = 0; i < 3; i++) { xnum = (xnum + CA[i]) * z; xden = (xden + CB[i]) * z; }
    const erf = y * (xnum + CA[3]) / (xden + CB[3]);
    return Math.exp(z) * (1 - erf);
  }
  if (y <= 4) {
    let xnum = CC[8] * y, xden = y;
    for (let i = 0; i < 7; i++) { xnum = (xnum + CC[i]) * y; xden = (xden + CD[i]) * y; }
    return (xnum + CC[7]) / (xden + CD[7]);
  }
  const z = 1 / (y * y);
  let xnum = CP[5] * z, xden = z;
  for (let i = 0; i < 4; i++) { xnum = (xnum + CP[i]) * z; xden = (xden + CQ[i]) * z; }
  return (SQRPI - z * (xnum + CP[4]) / (xden + CQ[4])) / y;
}

/** Standard normal CDF. Max abs error ~2e-16. */
export function Phi(z: number): number {
  const x = -z / SQRT2;
  if (x >= 0) return 0.5 * Math.exp(-x * x) * erfcxPos(x);
  return 1 - 0.5 * Math.exp(-x * x) * erfcxPos(-x);
}

/**
 * log of the standard normal CDF. NEVER compute this as Math.log(Phi(z)):
 * Phi(-40) is ~7e-350 and flushes to zero, and h() below is evaluated where the
 * argument reaches -360/sigma, so the deep tail is the main path, not a corner.
 */
export function logPhi(z: number): number {
  const x = -z / SQRT2;
  // Both terms are O(1) in magnitude here even when Phi itself is 1e-350.
  if (x >= 0) return Math.log(0.5 * erfcxPos(x)) - x * x;
  // log1p, so no cancellation as Phi -> 1.
  return Math.log1p(-0.5 * Math.exp(-x * x) * erfcxPos(-x));
}

/** Inverse Mills ratio phi(z)/Phi(z), routed through logPhi so it survives the
 *  tail where phi and Phi both underflow. */
function mills(z: number): number {
  return Math.exp(-0.5 * z * z - LOG_SQRT_2PI - logPhi(z));
}

// ── h and its inverse ────────────────────────────────────────────────────────

export interface HParams {
  muR: number; sigmaR: number;   // rider WTP        ~ LogNormal
  muD: number; sigmaD: number;   // driver res. cost ~ LogNormal
  tau: number;                   // take rate used for BELIEFS (see tauBelief)
}

/**
 * h(p) = log G_C((1-tau)p) - log[1 - F_V(p)], written as a difference of two
 * log-CDFs. Writing it this way makes right-tail cancellation structurally
 * impossible: the survival function of a lognormal IS Phi of a negated
 * argument, so `1 - F_V` is never formed.
 *
 * Strictly increasing, and a bijection onto the whole real line, for ANY
 * monotone CDFs — no shape assumption needed.
 */
export function makeH(hp: HParams) {
  const kD = (Math.log(1 - hp.tau) - hp.muD) / hp.sigmaD;
  const kR = -hp.muR / hp.sigmaR;
  const invSD = 1 / hp.sigmaD, invSR = 1 / hp.sigmaR;

  /** h as a function of y = log p. */
  const hOfY = (y: number): number => {
    const zD = y * invSD + kD;
    const zR = y * invSR + kR;
    return logPhi(zD) - logPhi(-zR);
  };
  /** dh/dy. Both terms positive by construction, so monotonicity of h holds in
   *  floating point and the root bracket can never invert. */
  const dhOfY = (y: number): number => {
    const zD = y * invSD + kD;
    const zR = y * invSR + kR;
    return mills(zD) * invSD + mills(-zR) * invSR;
  };

  // The bracket must span every target that can be asked for, which is
  // m +/- 8*sigma_x. A [0.05, 2000] bracket only reaches h in [-124, +58] and
  // silently returned the endpoint above that; this reaches about [-560, +477].
  const Y_LO = Math.log(1e-4), Y_HI = Math.log(1e7);

  /**
   * Solve h(exp(y)) = target for y, by safeguarded Newton on y = log p.
   * NOTE the early exit on f === 0: without it, the bracket update makes the
   * Newton step land exactly on an endpoint, the safeguard fires, and the
   * iterate is thrown to the bracket midpoint AFTER it has already converged —
   * 13.6 iterations instead of 4.2, with a correct answer either way.
   */
  const H_LO = hOfY(Y_LO), H_HI = hOfY(Y_HI);

  const hinvY = (target: number, tol = 1e-9): number => {
    // Genuinely unreachable targets are clamped, not silently mis-solved.
    if (target <= H_LO) return Y_LO;
    if (target >= H_HI) return Y_HI;
    let a = Y_LO, b = Y_HI;
    // Asymptotic seed: h ~ -(y - muD + log(1-tau))^2/(2 sigmaD^2) on the left,
    // +(y - muR)^2/(2 sigmaR^2) on the right.
    let y = target < 0
      ? hp.muD - Math.log(1 - hp.tau) - hp.sigmaD * Math.sqrt(Math.max(0, -2 * target))
      : hp.muR + hp.sigmaR * Math.sqrt(Math.max(0, 2 * target));
    if (!(y > a && y < b)) y = 0.5 * (a + b);
    for (let it = 0; it < 60; it++) {
      const f = hOfY(y) - target;
      if (f === 0) return y;
      if (f < 0) a = y; else b = y;
      const d = dhOfY(y);
      let yn = d > 0 ? y - f / d : 0.5 * (a + b);
      if (!(yn >= a && yn <= b) || !Number.isFinite(yn)) yn = 0.5 * (a + b);
      if (Math.abs(yn - y) < tol) return yn;
      y = yn;
    }
    return y;
  };

  return { hOfY, dhOfY, hinvY, h: (p: number) => hOfY(Math.log(p)) };
}

// ── Cutoffs ──────────────────────────────────────────────────────────────────

export interface Cutoffs {
  /** Riders search iff vMinus <= v <= vPlus. Empty band is encoded as
   *  (+Inf, -Inf) so the per-agent hot path needs no special case. */
  vMinus: number; vPlus: number;
  /** Drivers search iff c <= cPlus. */
  cPlus: number;
  Hbar: number;      // rider option value at v >= p_j
  Kbar: number;      // driver option value, already scaled by (1-tau)
  degenerate: boolean; // the full-information branch was taken
}

const EMPTY_BAND = { vMinus: Infinity, vPlus: -Infinity };

// Gauss-Legendre, 5 nodes on [-1,1].
const GL5_X = [-0.906179845938664, -0.5384693101056831, 0, 0.5384693101056831, 0.906179845938664];
const GL5_W = [0.23692688505618908, 0.47862867049936647, 0.5688888888888889,
               0.47862867049936647, 0.23692688505618908];

// Inverse Vandermonde at the GL5 nodes, built once. Converting a panel's five
// samples to monomial coefficients turns every later evaluation of the integrand
// and of its antiderivative into ~10 multiplies, instead of a 125-multiply
// Lagrange sum — which matters because the root solve evaluates them repeatedly.
const INV_V: number[][] = (() => {
  const n = 5;
  const M: number[][] = GL5_X.map(x => {
    const row: number[] = [];
    for (let k = 0; k < n; k++) row.push(Math.pow(x, k));
    for (let k = 0; k < n; k++) row.push(k === GL5_X.indexOf(x) ? 1 : 0);
    return row;
  });
  // identity block, set explicitly (indexOf is unsafe for duplicate values)
  for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) M[i][n + k] = i === k ? 1 : 0;
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    [M[col], M[piv]] = [M[piv], M[col]];
    const d = M[col][col];
    for (let k = 0; k < 2 * n; k++) M[col][k] /= d;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      for (let k = 0; k < 2 * n; k++) M[r][k] -= f * M[col][k];
    }
  }
  // After elimination M[i][n+k] is inv(V)[i][k]. We want
  // INV_V[k][i] = inv(V)[k][i] so that c[k] = sum_i INV_V[k][i]*f[i] solves
  // V c = f. Taking M[i][n+k] here would store the TRANSPOSE — which leaves
  // every closed-form output correct and silently corrupts only the interior
  // interpolation, i.e. only vMinus.
  const out: number[][] = [];
  for (let k = 0; k < n; k++) { const row: number[] = []; for (let i = 0; i < n; i++) row.push(M[k][n + i]); out.push(row); }
  return out;
})();

/** A panel's integrand as a degree-4 polynomial in the local coordinate. */
function panelCoeffs(samples: number[]): number[] {
  const c = [0, 0, 0, 0, 0];
  for (let k = 0; k < 5; k++) { let v = 0; for (let i = 0; i < 5; i++) v += INV_V[k][i] * samples[i]; c[k] = v; }
  return c;
}
/** P(x) — the integrand (F * dt/dy) at local coordinate x. */
function pEval(c: number[], x: number): number {
  return c[0] + x * (c[1] + x * (c[2] + x * (c[3] + x * c[4])));
}
/** integral of P from -1 to x. */
function pInt(c: number[], x: number): number {
  let acc = 0, xp = x, mp = -1;
  for (let k = 0; k < 5; k++) { acc += c[k] * (xp - mp) / (k + 1); xp *= x; mp *= -1; }
  return acc;
}

export interface CutoffArgs {
  pj: number;        // the agent's own platform price
  muX: number;       // mean of x = log(A/B)
  sigmaX: number;    // sd of x, INCLUDING the residual queue-noise term
  rho: number;       // cross-platform correlation of x
  sR: number;        // rider search cost as a fraction of own WTP
  sD: number;        // driver search cost as a fraction of own reservation cost
  tau: number;       // take rate, for converting the price integral to wages
  H: ReturnType<typeof makeH>;
  /**
   * Liquidity multipliers on the OPTION VALUE: the probability of actually
   * transacting on the rival platform relative to on the agent's own. Default 1,
   * which is the write-up's static, queueless case.
   *
   * These must be applied HERE, not by post-multiplying the returned cutoffs.
   * Scaling the option value by g maps H(v) -> g H(v), which moves BOTH ends of
   * the rider band: v_plus = g Hbar / sR falls when g < 1, and v_minus, which
   * solves g H(v)/v = sR, RISES. Post-scaling v_plus alone leaves v_minus at its
   * undiscounted value, so the band shrinks from one end only and — worse — can
   * never empty, however illiquid the rival is. The no-search condition is
   * g Hbar <= sR p_j and it has to be able to bind, because "the rival is so
   * thin it is not worth looking at" is the whole point of the discount.
   */
  gainR?: number;
  gainD?: number;
}

/**
 * The expensive call: once per platform per tick, never per agent.
 *
 * Quadrature is composite Gauss-Legendre in y = log t over a bracket that is
 * SOLVED FOR rather than fixed, so as the conditional sd shrinks the nodes
 * follow it and accuracy is invariant. A panel knot is forced at log(p_j)
 * because GL is superconvergent at panel boundaries — reading Hbar off a panel
 * edge instead of an interior interpolant is ~340x more accurate for free.
 */
export function buildCutoffs(a: CutoffArgs): Cutoffs {
  const { pj, muX, sigmaX, rho, tau, H } = a;
  // Multiplying the option value by g is algebraically identical to dividing the
  // search cost by g, and dividing is done ONCE here — so there is exactly one
  // place the discount can be got wrong instead of one per cutoff. g = 0 (the
  // rival cannot transact at all) correctly means an infinite effective cost,
  // i.e. no search.
  const gR = a.gainR === undefined ? 1 : Math.max(0, a.gainR);
  const gD = a.gainD === undefined ? 1 : Math.max(0, a.gainD);
  const sR = gR > 0 ? a.sR / gR : Infinity;
  const sD = gD > 0 ? a.sD / gD : Infinity;
  const s = sigmaX * Math.sqrt(Math.max(0, 1 - rho * rho));
  const m = muX + rho * (H.h(pj) - muX);

  // ── Full-information branch ────────────────────────────────────────────────
  // s -> 0 is NOT a singularity to be floored: it is the limit where the rival's
  // price is known exactly, and the search interval survives in closed form.
  // The step approximation's error is ~6 s^2, so at s < 1e-9 the switch is
  // invisible; only s == 0 exactly would divide by zero.
  if (s < 1e-9) {
    const pDet = Math.exp(H.hinvY(m));
    const Hbar = Math.max(pj - pDet, 0);
    const Ktilde = Math.max(pDet - pj, 0);
    const band = !(sR > 0) || !Number.isFinite(sR) || sR * pj >= Hbar
      ? (sR > 0 ? EMPTY_BAND : { vMinus: -Infinity, vPlus: Infinity })
      : { vMinus: pDet / (1 - sR), vPlus: Hbar / sR };
    return {
      // sD <= 0 is free search, so the lower set is everything — same convention
      // as the non-degenerate branch below. Without the guard, sD = 0 with
      // Ktilde = 0 evaluates 0/0 = NaN, and every `c <= cPlus` test then reads
      // false, i.e. free search would silently mean NO search.
      ...band, cPlus: sD <= 0 ? Infinity : Number.isFinite(sD) ? (1 - tau) * Ktilde / sD : 0,
      Hbar, Kbar: (1 - tau) * Ktilde, degenerate: true,
    };
  }

  // ── Bracket ───────────────────────────────────────────────────────────────
  // Below yLo the integrand is < Phi(-6.5) = 4e-11 and the dropped mass is
  // bounded by t*F(t); above yHi, F is 1 to within 1-Phi(8) = 6e-16 and the
  // remainder is added in closed form. So no node is ever spent on a flat region.
  const yLo = H.hinvY(m - 6.5 * s);
  const yHi = H.hinvY(m + 8 * s);
  const yJ = Math.log(pj);

  const Fy = (y: number) => Phi((H.hOfY(y) - m) / s);

  // Two segments, knot forced at log(p_j), 4 panels each.
  const segs: Array<[number, number]> = [];
  if (yJ > yLo) segs.push([yLo, yJ]); else segs.push([yLo, yLo]);
  if (yHi > Math.max(yJ, yLo)) segs.push([Math.max(yJ, yLo), yHi]);
  const PANELS = 4;
  const edges: number[] = [];
  const prefix: number[] = [];   // integral of F dt up to each edge
  const coeffs: number[][] = []; // per-panel integrand samples, for the interpolant
  let acc = 0;
  // Index in `edges` of the forced knot at log(p_j). Tracked as the segment
  // loop runs rather than recovered afterwards by searching `edges` for a value
  // within a tolerance of yJ: that search returns -1 whenever p_j falls OUTSIDE
  // the bracket (p_j <= exp(yLo), which happens when the price is pinned far
  // below the belief-implied level), and the -1 fallback silently used the WHOLE
  // integral as Hbar — off by 14 orders of magnitude, so every agent searched.
  // With the index tracked, a degenerate first segment leaves knot = 0, i.e.
  // Hbar = 0, which is the correct limit (F < Phi(-6.5) below the bracket).
  let knot = 0;
  edges.push(segs[0][0]); prefix.push(0);
  for (let si = 0; si < segs.length; si++) {
    const [lo, hi] = segs[si];
    if (!(hi > lo)) { if (si === 0) knot = edges.length - 1; continue; }
    const step = (hi - lo) / PANELS;
    for (let p = 0; p < PANELS; p++) {
      const y0 = lo + p * step, y1 = y0 + step;
      const mid = 0.5 * (y0 + y1), half = 0.5 * step;
      let sum = 0;
      const samples: number[] = [];
      for (let k = 0; k < 5; k++) {
        const y = mid + half * GL5_X[k];
        // dt = e^y dy, so the integrand in y carries the Jacobian.
        const f = Fy(y) * Math.exp(y);
        samples.push(f);
        sum += GL5_W[k] * f;
      }
      acc += half * sum;
      edges.push(y1); prefix.push(acc); coeffs.push(panelCoeffs(samples));
    }
    if (si === 0) knot = edges.length - 1;
  }

  // Hbar comes off a panel BOUNDARY (the forced knot), not an interpolant.
  const Hbar = prefix[knot];
  // Ktilde = length above p_j minus the integral of F there.
  // Ktilde integrates (1 - F) from p_j up, so the lower limit is p_j itself even
  // when p_j sits below the quadrature bracket: on (p_j, exp(yLo)) the dropped
  // integrand F is < Phi(-6.5), so (1 - F) there is ~1 and that length belongs
  // in Ktilde. Clamping the limit up to exp(yLo) instead discarded it, which
  // understated Ktilde by exp(yLo) - p_j (2.6% at p_j = pMin under preset 3).
  const tHi = Math.exp(yHi), tJ = pj;
  const Ktilde = Math.max(0, (tHi - tJ) - (prefix[prefix.length - 1] - Hbar));
  const Kbar = (1 - tau) * Ktilde;

  // ── Rider band ────────────────────────────────────────────────────────────
  // H(v)/v is unimodal with its peak exactly at v = p_j, so the band is
  // non-empty iff sR <= Hbar/pj. This is the ONLY emptiness test; never decide
  // it by comparing vPlus to vMinus, which would hide a bug behind a plausible
  // guard.
  let band = EMPTY_BAND;
  if (sR > 0 && Number.isFinite(sR) && sR * pj <= Hbar) {
    const vPlus = Hbar / sR;
    // vMinus solves G(v) = H(v)/v = sR on (0, p_j), where G is strictly
    // increasing. Bisection rather than Newton: G is dead flat over the lower
    // part of the range (F is ~0 there), so a Newton step from a flat region
    // lands wherever the safeguard throws it and the iteration wanders. The
    // evaluator is transcendental-free, so 60 bisection steps cost ~1200
    // multiplies and the accuracy limit is the interpolant, not the root finder.
    let lo = Math.exp(edges[0]), hi = pj;
    for (let i = 0; i < 60; i++) {
      const v = 0.5 * (lo + hi);
      if (stateAt(v, edges, prefix, coeffs).H / v < sR) lo = v; else hi = v;
      if (hi - lo < 1e-11) break;
    }
    band = { vMinus: 0.5 * (lo + hi), vPlus };
  } else if (sR <= 0) {
    band = { vMinus: -Infinity, vPlus: Infinity };
  }

  // ── Driver cutoff ─────────────────────────────────────────────────────────
  // K is flat at Kbar on [0, w_j] then strictly decreasing, so the set is a
  // lower set and the closed form applies on the operative branch.
  const wj = (1 - tau) * pj;
  let cPlus: number;
  if (sD <= 0) cPlus = Infinity;
  else if (!Number.isFinite(sD)) cPlus = 0;          // g_D = 0: never search
  else if (Kbar <= sD * wj) cPlus = Kbar / sD;       // closed form
  else {
    let lo = wj, hi = Math.max(wj * 1.0001, Kbar / sD);
    for (let i = 0; i < 60; i++) {
      const c = 0.5 * (lo + hi);
      // K(c) above w_j, in wage units.
      const u = c / (1 - tau);
      const uc = Math.max(u, tJ);
      const above = (tHi - uc) - (prefix[prefix.length - 1] - stateAt(uc, edges, prefix, coeffs).H);
      const K = (1 - tau) * Math.max(0, above);
      if (K > sD * c) lo = c; else hi = c;
      if (hi - lo < 1e-10) break;
    }
    cPlus = 0.5 * (lo + hi);
  }

  return { ...band, cPlus, Hbar, Kbar, degenerate: false };
}

/**
 * Both quantities needed at a point, from one panel lookup and ~20 multiplies:
 *   H = integral of F dt from the bracket's lower end up to t
 *   P = the stored integrand F(t)*t, so F(t) = P/t
 * No transcendental is re-evaluated, which is what keeps the root solves free.
 */
function stateAt(
  t: number, edges: number[], prefix: number[], coeffs: number[][],
): { H: number; P: number } {
  const y = Math.log(t);
  const last = edges.length - 1;
  if (y <= edges[0]) return { H: 0, P: 0 };
  if (y >= edges[last]) return { H: prefix[last], P: coeffs[last - 1] ? pEval(coeffs[last - 1], 1) : 0 };
  let p = 0;
  while (p + 1 < last && edges[p + 1] < y) p++;
  const y0 = edges[p], y1 = edges[p + 1];
  const half = 0.5 * (y1 - y0), mid = 0.5 * (y0 + y1);
  const x = (y - mid) / half;
  const c = coeffs[p];
  return { H: prefix[p] + half * pInt(c, x), P: pEval(c, x) };
}
