// mulberry32 — fast, high-quality 32-bit seeded PRNG
export function createPRNG(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed: number) {
  const rand = createPRNG(seed);

  function uniform(): number {
    return rand();
  }

  // Box-Muller transform — standard normal
  let spare: number | null = null;
  function normal(): number {
    if (spare !== null) {
      const v = spare;
      spare = null;
      return v;
    }
    let u, v, s;
    do {
      u = rand() * 2 - 1;
      v = rand() * 2 - 1;
      s = u * u + v * v;
    } while (s >= 1 || s === 0);
    const m = Math.sqrt((-2 * Math.log(s)) / s);
    spare = v * m;
    return u * m;
  }

  function logNormal(mu: number, sigma: number): number {
    return Math.exp(mu + sigma * normal());
  }

  function exponential(lambda: number): number {
    return -Math.log(1 - rand()) / lambda;
  }

  function bernoulli(p: number): boolean {
    return rand() < p;
  }

  // Binomial(n, p) via sum of Bernoullis — fine for queue sizes in this sim
  function binomial(n: number, p: number): number {
    if (n === 0 || p === 0) return 0;
    if (p === 1) return n;
    let count = 0;
    for (let i = 0; i < n; i++) if (rand() < p) count++;
    return count;
  }

  // Knuth's Poisson sampler (exact, efficient for small λ)
  function poisson(lambda: number): number {
    if (lambda <= 0) return 0;
    const L = Math.exp(-lambda);
    let k = 0, p = 1;
    do { k++; p *= rand(); } while (p > L);
    return k - 1;
  }

  return { uniform, normal, logNormal, exponential, bernoulli, binomial, poisson };
}

export type RNG = ReturnType<typeof makeRng>;
