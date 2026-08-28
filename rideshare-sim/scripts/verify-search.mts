import { Phi, logPhi, makeH, buildCutoffs } from '../src/engine/search';
import { DEFAULT_CONFIG as C } from '../src/engine/config';

let fail = 0;
const ck = (name: string, got: number, want: number, tol: number) => {
  const err = Math.abs(got - want);
  const ok = err <= tol;
  if (!ok) fail++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(34)} got ${got.toPrecision(10).padStart(16)}  want ${want.toPrecision(10).padStart(16)}  err ${err.toExponential(2)}`);
};

console.log('\n── Phi against exact reference values ──');
ck('Phi(0)',    Phi(0),    0.5, 1e-16);
ck('Phi(-1)',   Phi(-1),   0.15865525393145705, 1e-15);
ck('Phi(-5)',   Phi(-5),   2.866515718791939e-7, 1e-21);
ck('Phi(-10)',  Phi(-10),  7.619853024160525e-24, 1e-37);
ck('Phi(2.5)',  Phi(2.5),  0.9937903346742238, 1e-15);
ck('Phi(8)',    Phi(8),    0.9999999999999994, 1e-15);

console.log('\n── logPhi: must survive where Phi itself underflows ──');
ck('logPhi(-10)', logPhi(-10), Math.log(7.619853024160525e-24), 1e-12);
// Phi(-40) ~ 7.3e-350 flushes to 0 in a double, so log(Phi(-40)) = -Infinity.
// Asymptotic: log Phi(z) = -z^2/2 - log(-z) - log(sqrt(2pi)) + log(1 - 1/z^2 + 3/z^4)
const asym = (z: number) => -0.5*z*z - Math.log(-z) - 0.9189385332046727 + Math.log1p(-1/(z*z) + 3/(z**4) - 15/(z**6));
ck('logPhi(-40) vs asymptotic', logPhi(-40), asym(-40), 1e-9);
ck('logPhi(-100) vs asymptotic', logPhi(-100), asym(-100), 1e-10);
console.log(`       (naive Math.log(Phi(-40)) would give ${Math.log(Phi(-40))})`);

console.log('\n── h: monotone bijection, and the economist"s table ──');
const H = makeH({ muR: C.muR, sigmaR: C.sigmaR, muD: C.muD, sigmaD: C.sigmaD, tau: C.tauA });
for (const [p, want] of [[1.0,-26.93],[6.0,-3.364],[10.0,-1.006],[16.0,-0.022],[25.0,0.681],[60.0,3.987]] as Array<[number,number]>)
  ck(`h(${p})`, H.h(p), want, 5e-3);
let mono = true, prev = -Infinity;
for (let p = 0.05; p < 2000; p *= 1.05) { const v = H.h(p); if (!(v > prev)) mono = false; prev = v; }
console.log(`  ${mono ? 'ok  ' : 'FAIL'} h strictly increasing over p in [0.05, 2000]`);
if (!mono) fail++;
// round-trip
let maxRT = 0;
for (let tgt = -400; tgt <= 400; tgt += 0.73) {
  const p = Math.exp(H.hinvY(tgt));
  maxRT = Math.max(maxRT, Math.abs(H.h(p) - tgt));
}
ck('hinv round-trip, worst over [-400,400]', maxRT, 0, 1e-7);

console.log('\n── panel interpolant round-trip (guards the inverse-Vandermonde) ──');
{
  // H(v) evaluated on the interpolant must agree with a direct fine-grid
  // integral of F at interior points, not only at panel boundaries.
  const A = { pj: 16, muX: -0.0248, sigmaX: 0.354, rho: 0, sR: 0.0504, sD: 0.186, tau: 0.25, H };
  const m = A.muX;
  let worst = 0;
  // Only where the inversion is well-conditioned: below ~13 the reference
  // integral underflows (F ~ 1e-54), so sR = H(v)/v cannot be recovered.
  for (const v of [13, 14, 14.5, 15, 15.5, 15.9]) {
    const yA = Math.log(1e-6), yB = Math.log(v), N = 60000, hs = (yB-yA)/N;
    let ref = 0;
    for (let i = 0; i <= N; i++) { const y = yA + i*hs; ref += (i===0||i===N?1:i%2?4:2) * Phi((H.hOfY(y)-m)/A.sigmaX) * Math.exp(y); }
    ref *= hs/3;
    // recover H(v) from the module by inverting the band condition at sR = H(v)/v
    const c = buildCutoffs({ ...A, sR: ref/v });
    worst = Math.max(worst, Math.abs(c.vMinus - v));
  }
  ck('interior H(v) inverts to v, worst', worst, 0, 5e-3);
}

console.log('\n── mu_x and the engine"s stationary price (the 0.2% claim) ──');
const q = 1 - Math.exp(-C.muMatchA * C.dt);
const muX = Math.log((C.arrivalRateR * C.piR) / (C.arrivalRateD * C.piD))
          + Math.log((q + C.lambdaD) / (q + C.lambdaR));
ck('mu_x', muX, -0.0248, 1e-3);
const pStar = Math.exp(H.hinvY(muX));
ck('h^-1(mu_x) = predicted price', pStar, 15.97, 0.05);
console.log(`       engine's measured stationary price: $15.95-$16.17  ->  ${(100*Math.abs(pStar-16.06)/16.06).toFixed(2)}% off midpoint`);

console.log('\n── cutoffs vs the economist"s independently computed values ──');
const args = { pj: 16, muX: -0.0248, sigmaX: 0.354, rho: 0, sR: 0.0504, sD: 0.186, tau: 0.25, H };
const cut = buildCutoffs(args);
ck('Hbar', cut.Hbar, 1.188, 5e-3);
ck('v_minus', cut.vMinus, 15.053, 5e-3);
ck('v_plus',  cut.vPlus,  23.563, 5e-3);
ck('Kbar (wage units)', cut.Kbar, 1.306, 5e-3);
ck('c_plus', cut.cPlus, 7.03, 1e-2);
console.log(`       band [${cut.vMinus.toFixed(2)}, ${cut.vPlus.toFixed(2)}] straddles p_j=16: ${cut.vMinus < 16 && 16 <= cut.vPlus ? 'ok' : 'FAIL'}`);
if (!(cut.vMinus < 16 && 16 <= cut.vPlus)) fail++;

console.log('\n── Hbar vs brute-force fine-grid reference (tests the quadrature) ──');
for (const [sx, rho] of [[0.1,0],[0.354,0],[0.354,0.5],[0.2,0.99],[1.0,-0.9],[2.0,0.3]] as Array<[number,number]>) {
  const s = sx * Math.sqrt(1 - rho*rho);
  const m = args.muX + rho * (H.h(16) - args.muX);
  // reference: 200k-point Simpson in log t, over a very wide bracket
  const yA = Math.log(1e-6), yB = Math.log(16);
  const N = 200000; const hStep = (yB - yA) / N;
  let ref = 0;
  for (let i = 0; i <= N; i++) {
    const y = yA + i * hStep;
    const f = Phi((H.hOfY(y) - m)/s) * Math.exp(y);
    ref += (i === 0 || i === N ? 1 : i % 2 ? 4 : 2) * f;
  }
  ref *= hStep / 3;
  const got = buildCutoffs({ ...args, sigmaX: sx, rho }).Hbar;
  ck(`Hbar sigma_x=${sx} rho=${rho}`, got, ref, 3e-3);
}

console.log('\n── degenerate branch: sigma_x -> 0 is full information, not no-search ──');
const d0 = buildCutoffs({ ...args, sigmaX: 0, rho: 0, muX: H.h(15) });
console.log(`  sigma_x=0, rival known at $15: degenerate=${d0.degenerate} band [${d0.vMinus.toFixed(3)}, ${d0.vPlus.toFixed(3)}]`);
ck('  v_minus = pDet/(1-sR)', d0.vMinus, 15/(1-0.0504), 2e-2);
ck('  v_plus = (pj-pDet)/sR', d0.vPlus, (16-15)/0.0504, 2e-1);
const dSame = buildCutoffs({ ...args, sigmaX: 0, rho: 0, muX: H.h(16) });
console.log(`  sigma_x=0 AND rival = own price: band empty? ${dSame.vMinus === Infinity ? 'yes (nobody searches)' : 'NO -> FAIL'}`);
if (dSame.vMinus !== Infinity) fail++;
const dRho1 = buildCutoffs({ ...args, rho: 1, muX: 0 });
console.log(`  rho=+1: band empty? ${dRho1.vMinus === Infinity ? 'yes (rival price known equal)' : 'NO -> FAIL'}`);
if (dRho1.vMinus !== Infinity) fail++;

console.log('\n── no-search threshold is exactly sR = Hbar/pj ──');
const hb = cut.Hbar / 16;
console.log(`  Hbar/pj = ${hb.toFixed(5)}`);
for (const sr of [hb*0.99, hb*1.01]) {
  const c2 = buildCutoffs({ ...args, sR: sr });
  console.log(`  sR=${sr.toFixed(5)} (${sr<hb?'below':'above'}): ${c2.vMinus === Infinity ? 'nobody searches' : `band [${c2.vMinus.toFixed(2)}, ${c2.vPlus.toFixed(2)}]`}`);
}

console.log('\n── timing ──');
for (const [label, aa] of [['unclamped', args], ['degenerate', {...args, sigmaX: 0}]] as Array<[string, typeof args]>) {
  const N = 20000;
  const t0 = process.hrtime.bigint();
  for (let i = 0; i < N; i++) buildCutoffs({ ...aa, pj: 16 + (i % 7) * 0.01 });
  const ns = Number(process.hrtime.bigint() - t0) / N;
  console.log(`  ${label.padEnd(12)} ${(ns/1000).toFixed(3)} us per cutoff set`);
}

console.log(fail === 0 ? '\n✓ ALL CHECKS PASSED' : `\n✗ ${fail} CHECKS FAILED`);
process.exit(fail === 0 ? 0 : 1);
