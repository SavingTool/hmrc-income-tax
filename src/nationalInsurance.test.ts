import {
  calculateEmployeeNationalInsurance,
  calculateEmployerNationalInsurance,
  calculateClass2NationalInsurance,
  calculateClass3NationalInsurance,
  calculateClass4NationalInsurance,
} from "./nationalInsurance";

// ─── Class 1, Category A — Employee ──────────────────────────────────────────
// Annual thresholds: primary threshold £12,570, upper earnings limit £50,270 (all years below;
// gov.uk "Rates and thresholds for employers"). E.g. 2024/25 £60,000: (50,270 - 12,570) x 8% +
// (60,000 - 50,270) x 2% = 3,016 + 194.60 = 3,210.60. Values are exact decimals (the 2022/23
// rates 13.25% / 3.25% give half-pennies); the library returns unrounded pounds.

const expectationsA = [
  { grossAnnualIncome: 15_000, nics: 321.975 },
  { grossAnnualIncome: 17_500, nics: 653.225 },
  { grossAnnualIncome: 20_000, nics: 984.475 },
  { grossAnnualIncome: 22_500, nics: 1315.725 },
  { grossAnnualIncome: 25_000, nics: 1646.975 },
  { grossAnnualIncome: 50_000, nics: 4959.475 },
  { grossAnnualIncome: 55_000, nics: 5148.975 },
  { grossAnnualIncome: 60_000, nics: 5311.475 },
  { grossAnnualIncome: 75_000, nics: 5798.975 },
  { grossAnnualIncome: 90_000, nics: 6286.475 },
  { grossAnnualIncome: 110_000, nics: 6936.475 },
  { grossAnnualIncome: 130_000, nics: 7586.475 },
  { grossAnnualIncome: 150_000, nics: 8236.475 },
  { grossAnnualIncome: 175_000, nics: 9048.975 },
  { grossAnnualIncome: 200_000, nics: 9861.475 },
  { grossAnnualIncome: 250_000, nics: 11486.475 },
  { grossAnnualIncome: 500_000, nics: 19611.475 },
  { grossAnnualIncome: 1_000_000, nics: 35861.475 },
];

describe("calculateEmployeeNationalInsurance (22/23)", () => {
  expectationsA.forEach((expectation) => {
    const { grossAnnualIncome, nics } = expectation;
    test(grossAnnualIncome.toString(), () => {
      expect(
        calculateEmployeeNationalInsurance({
          taxYear: "2022/23",
          grossAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

const expectationsB = [
  { grossAnnualIncome: 15_000, nics: 243 },
  { grossAnnualIncome: 17_500, nics: 493 },
  { grossAnnualIncome: 20_000, nics: 743 },
  { grossAnnualIncome: 22_500, nics: 993 },
  { grossAnnualIncome: 25_000, nics: 1243 },
  { grossAnnualIncome: 50_000, nics: 3743 },
  { grossAnnualIncome: 55_000, nics: 3864.6 },
  { grossAnnualIncome: 60_000, nics: 3964.6 },
  { grossAnnualIncome: 75_000, nics: 4264.6 },
  { grossAnnualIncome: 90_000, nics: 4564.6 },
  { grossAnnualIncome: 110_000, nics: 4964.6 },
  { grossAnnualIncome: 130_000, nics: 5364.6 },
  { grossAnnualIncome: 150_000, nics: 5764.6 },
  { grossAnnualIncome: 175_000, nics: 6264.6 },
  { grossAnnualIncome: 200_000, nics: 6764.6 },
  { grossAnnualIncome: 250_000, nics: 7764.6 },
  { grossAnnualIncome: 500_000, nics: 12764.6 },
  { grossAnnualIncome: 1_000_000, nics: 22764.6 },
];

describe("calculateEmployeeNationalInsurance (23/24)", () => {
  expectationsB.forEach((expectation) => {
    const { grossAnnualIncome, nics } = expectation;
    test(grossAnnualIncome.toString(), () => {
      expect(
        calculateEmployeeNationalInsurance({
          taxYear: "2023/24",
          grossAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

const expectationsC = [
  { grossAnnualIncome: 15_000, nics: 194.4 },
  { grossAnnualIncome: 17_500, nics: 394.4 },
  { grossAnnualIncome: 20_000, nics: 594.4 },
  { grossAnnualIncome: 22_500, nics: 794.4 },
  { grossAnnualIncome: 25_000, nics: 994.4 },
  { grossAnnualIncome: 50_000, nics: 2994.4 },
  { grossAnnualIncome: 55_000, nics: 3110.6 },
  { grossAnnualIncome: 60_000, nics: 3210.6 },
  { grossAnnualIncome: 75_000, nics: 3510.6 },
  { grossAnnualIncome: 90_000, nics: 3810.6 },
  { grossAnnualIncome: 110_000, nics: 4210.6 },
  { grossAnnualIncome: 130_000, nics: 4610.6 },
  { grossAnnualIncome: 150_000, nics: 5010.6 },
  { grossAnnualIncome: 175_000, nics: 5510.6 },
  { grossAnnualIncome: 200_000, nics: 6010.6 },
  { grossAnnualIncome: 250_000, nics: 7010.6 },
  { grossAnnualIncome: 500_000, nics: 12010.6 },
  { grossAnnualIncome: 1_000_000, nics: 22010.6 },
];

describe("calculateEmployeeNationalInsurance (24/25)", () => {
  expectationsC.forEach((expectation) => {
    const { grossAnnualIncome, nics } = expectation;
    test(grossAnnualIncome.toString(), () => {
      expect(
        calculateEmployeeNationalInsurance({
          taxYear: "2024/25",
          grossAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

describe("calculateEmployeeNationalInsurance — annual thresholds (26/27)", () => {
  const nics = (grossAnnualIncome: number) =>
    calculateEmployeeNationalInsurance({
      taxYear: "2026/27",
      grossAnnualIncome,
    });

  test("nothing up to the £12,570 primary threshold", () => {
    expect(nics(12_570)).toBe(0);
    expect(nics(12_584)).toBeCloseTo(1.12, 2); // 14 x 8%: not 0, 52 x £242 is not the threshold
  });

  test("8% on the £1 above the primary threshold", () => {
    expect(nics(12_571)).toBeCloseTo(0.08, 2);
  });

  test("the main rate applies up to and including the £50,270 upper earnings limit", () => {
    expect(nics(50_270)).toBeCloseTo(3_016, 2); // 37,700 x 8%
    expect(nics(50_271)).toBeCloseTo(3_016.02, 2);
  });

  test("£58,000: 3,016 + 7,730 x 2% = 3,170.60", () => {
    expect(nics(58_000)).toBeCloseTo(3_170.6, 2);
  });

  test("Scotland uses the same UK-wide thresholds", () => {
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2026/27",
        country: "Scotland",
        grossAnnualIncome: 58_000,
      })
    ).toBeCloseTo(3_170.6, 2);
  });
});

// ─── Class 1, Category A — Employer ──────────────────────────────────────────

// Employer NI (Class 1, Category A): 13.8% above £175/week secondary threshold
const employerExpectations2425 = [
  { grossAnnualIncome: 9_100, nics: 0 }, // at secondary threshold (£175/week × 52)
  { grossAnnualIncome: 10_000, nics: 124.2 }, // (10000 - 9100) × 13.8%
  { grossAnnualIncome: 20_000, nics: 1504.2 },
  { grossAnnualIncome: 30_000, nics: 2884.2 },
  { grossAnnualIncome: 50_000, nics: 5644.2 },
  { grossAnnualIncome: 75_000, nics: 9094.2 },
  { grossAnnualIncome: 100_000, nics: 12544.2 },
  { grossAnnualIncome: 150_000, nics: 19444.2 },
];

describe("calculateEmployerNationalInsurance (24/25)", () => {
  employerExpectations2425.forEach((expectation) => {
    const { grossAnnualIncome, nics } = expectation;
    test(grossAnnualIncome.toString(), () => {
      expect(
        calculateEmployerNationalInsurance({
          taxYear: "2024/25",
          grossAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

// Employer NI (Class 1, Category A): 15% above £96/week secondary threshold (from April 2025)
const employerExpectations2526 = [
  { grossAnnualIncome: 4_992, nics: 0 }, // at secondary threshold (£96/week × 52)
  { grossAnnualIncome: 10_000, nics: 751.2 }, // (10000 - 4992) × 15%
  { grossAnnualIncome: 20_000, nics: 2251.2 },
  { grossAnnualIncome: 30_000, nics: 3751.2 },
  { grossAnnualIncome: 50_000, nics: 6751.2 },
  { grossAnnualIncome: 75_000, nics: 10501.2 },
  { grossAnnualIncome: 100_000, nics: 14251.2 },
  { grossAnnualIncome: 150_000, nics: 21751.2 },
];

describe("calculateEmployerNationalInsurance (25/26)", () => {
  employerExpectations2526.forEach((expectation) => {
    const { grossAnnualIncome, nics } = expectation;
    test(grossAnnualIncome.toString(), () => {
      expect(
        calculateEmployerNationalInsurance({
          taxYear: "2025/26",
          grossAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

// Employer NI (Class 1, Category A): 15% above £96/week secondary threshold (unchanged from 2025/26)
describe("calculateEmployerNationalInsurance (26/27)", () => {
  employerExpectations2526.forEach((expectation) => {
    const { grossAnnualIncome, nics } = expectation;
    test(grossAnnualIncome.toString(), () => {
      expect(
        calculateEmployerNationalInsurance({
          taxYear: "2026/27",
          grossAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

// ─── Class 1, Category B — Employee (married women reduced rate) ──────────────
// 2024/25: 1.85% on £12,570–£50,270, 2% above £50,270
// £30,000: (30,000 - 12,570) × 1.85% = 322.46
// £60,000: middle band (50,270 - 12,570) × 1.85% = 697.45; above UEL (60,000 - 50,270) × 2% = 194.60. Total = 892.05
describe("calculateEmployeeNationalInsurance — Category B (24/25)", () => {
  test("£12,570 (at primary threshold) — should be 0", () => {
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2024/25",
        grossAnnualIncome: 12_570,
        niCategory: "B",
      })
    ).toBeCloseTo(0, 1);
  });

  test("£30,000", () => {
    // middle: (30,000 - 12,570) × 0.0185 = 322.455
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2024/25",
        grossAnnualIncome: 30_000,
        niCategory: "B",
      })
    ).toBeCloseTo(322.455, 3);
  });

  test("£60,000 (above UEL)", () => {
    // middle: (50,270 - 12,570) × 0.0185 = 697.45
    // upper: (60,000 - 50,270) × 0.02 = 194.60
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2024/25",
        grossAnnualIncome: 60_000,
        niCategory: "B",
      })
    ).toBeCloseTo(892.05, 2);
  });
});

// ─── Class 1, Category C — Employee (over State Pension age, exempt) ──────────
describe("calculateEmployeeNationalInsurance — Category C (25/26)", () => {
  test("any income — always 0", () => {
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 50_000,
        niCategory: "C",
      })
    ).toBe(0);
  });

  test("high income — still 0", () => {
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 200_000,
        niCategory: "C",
      })
    ).toBe(0);
  });
});

// ─── Class 1, Category J — Employee (deferring — only upper rate applies) ────
// 2025/26: 0% on £12,570–£50,270, 2% above £50,270
describe("calculateEmployeeNationalInsurance — Category J (25/26)", () => {
  test("£40,000 (below UEL) — should be 0", () => {
    // all in middle band → 0% → £0
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 40_000,
        niCategory: "J",
      })
    ).toBe(0);
  });

  test("£60,000 (above UEL)", () => {
    // above UEL: (60,000 - 50,270) × 0.02 = 194.60
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 60_000,
        niCategory: "J",
      })
    ).toBeCloseTo(194.6, 2);
  });
});

// ─── Class 1, Category X — Employee (exempt) ─────────────────────────────────
describe("calculateEmployeeNationalInsurance — Category X (25/26)", () => {
  test("any income — always 0", () => {
    expect(
      calculateEmployeeNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 100_000,
        niCategory: "X",
      })
    ).toBe(0);
  });
});

// ─── Class 1, Category H/M — Employer (under-21 / apprentice under-25 relief) ─
// 2025/26: employer pays 0% up to UEL (£967/week = £50,270/year), 15% above
describe("calculateEmployerNationalInsurance — Category H (25/26)", () => {
  test("£40,000 (below UEL) — employer pays 0", () => {
    expect(
      calculateEmployerNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 40_000,
        niCategory: "H",
      })
    ).toBe(0);
  });

  test("£50,270 (at UEL) — employer pays 0", () => {
    expect(
      calculateEmployerNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 50_270,
        niCategory: "H",
      })
    ).toBe(0);
  });

  test("£60,000 (above UEL)", () => {
    // weekly = 1153.85; above UEL (967): (1153.85 - 967) × 0.15 × 52 = 1457.4
    expect(
      calculateEmployerNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 60_000,
        niCategory: "H",
      })
    ).toBeCloseTo(1457.4, 0);
  });

  test("£100,000", () => {
    // weekly = 1923.08; above UEL (967): (1923.08 - 967) × 0.15 × 52 = 7457.7
    expect(
      calculateEmployerNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 100_000,
        niCategory: "H",
      })
    ).toBeCloseTo(7457.7, 0);
  });
});

describe("calculateEmployerNationalInsurance — Category M (24/25)", () => {
  test("£50,270 (at UEL) — employer pays 0", () => {
    expect(
      calculateEmployerNationalInsurance({
        taxYear: "2024/25",
        grossAnnualIncome: 50_270,
        niCategory: "M",
      })
    ).toBe(0);
  });

  test("£60,000 (above UEL)", () => {
    // weekly = 1153.85; above UEL (967): (1153.85 - 967) × 0.138 × 52 = 1340.7
    expect(
      calculateEmployerNationalInsurance({
        taxYear: "2024/25",
        grossAnnualIncome: 60_000,
        niCategory: "M",
      })
    ).toBeCloseTo(1340.7, 0);
  });
});

// ─── Class 1, Category F — Employer (Freeport) ───────────────────────────────
// 2025/26: employer pays 0% up to £481/week (£25,000/year), 15% above
describe("calculateEmployerNationalInsurance — Category F (25/26)", () => {
  test("£25,000 (at freeport threshold) — employer pays 0", () => {
    // £25,000/year = £480.77/week ≈ £481/week threshold
    expect(
      calculateEmployerNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 25_000,
        niCategory: "F",
      })
    ).toBe(0);
  });

  test("£40,000", () => {
    // weekly = 769.23; above freeport threshold (481): (769.23 - 481) × 0.15 × 52 = 2248.2
    expect(
      calculateEmployerNationalInsurance({
        taxYear: "2025/26",
        grossAnnualIncome: 40_000,
        niCategory: "F",
      })
    ).toBeCloseTo(2248.2, 0);
  });

  test("£40,000 Cat A pays more than Cat F", () => {
    const catA = calculateEmployerNationalInsurance({
      taxYear: "2025/26",
      grossAnnualIncome: 40_000,
      niCategory: "A",
    });
    const catF = calculateEmployerNationalInsurance({
      taxYear: "2025/26",
      grossAnnualIncome: 40_000,
      niCategory: "F",
    });
    expect(catA).toBeGreaterThan(catF);
  });
});

// ─── Class 2 ─────────────────────────────────────────────────────────────────
describe("calculateClass2NationalInsurance", () => {
  test("2023/24 — profit above small profits threshold returns annual amount", () => {
    // £3.45/week × 52 = £179.40
    expect(
      calculateClass2NationalInsurance({
        taxYear: "2023/24",
        grossAnnualProfit: 20_000,
      })
    ).toBeCloseTo(179.4, 1);
  });

  test("2023/24 — profit below small profits threshold (£6,725) returns 0", () => {
    expect(
      calculateClass2NationalInsurance({
        taxYear: "2023/24",
        grossAnnualProfit: 5_000,
      })
    ).toBe(0);
  });

  test("2022/23 — profit above threshold: £3.15/week × 52 = £163.80", () => {
    expect(
      calculateClass2NationalInsurance({
        taxYear: "2022/23",
        grossAnnualProfit: 10_000,
      })
    ).toBeCloseTo(163.8, 1);
  });

  test("2024/25 — always returns 0 (treated as paid automatically)", () => {
    expect(
      calculateClass2NationalInsurance({
        taxYear: "2024/25",
        grossAnnualProfit: 50_000,
      })
    ).toBe(0);
  });

  test("2025/26 — always returns 0 (treated as paid automatically)", () => {
    expect(calculateClass2NationalInsurance({ taxYear: "2025/26" })).toBe(0);
  });

  test("2026/27 — always returns 0 (treated as paid automatically)", () => {
    expect(calculateClass2NationalInsurance({ taxYear: "2026/27" })).toBe(0);
  });
});

// ─── Class 3 ─────────────────────────────────────────────────────────────────
describe("calculateClass3NationalInsurance", () => {
  test("2025/26 — £17.75/week × 52 = £923", () => {
    expect(
      calculateClass3NationalInsurance({ taxYear: "2025/26" })
    ).toBeCloseTo(923, 0);
  });

  test("2026/27 — £18.40/week × 52 = £956.80", () => {
    expect(
      calculateClass3NationalInsurance({ taxYear: "2026/27" })
    ).toBeCloseTo(956.8, 1);
  });

  test("2024/25 — £17.45/week × 52 = £907.40", () => {
    expect(
      calculateClass3NationalInsurance({ taxYear: "2024/25" })
    ).toBeCloseTo(907.4, 1);
  });

  test("2022/23 — £15.85/week × 52 = £824.20", () => {
    expect(
      calculateClass3NationalInsurance({ taxYear: "2022/23" })
    ).toBeCloseTo(824.2, 1);
  });
});

// ─── Class 4 ─────────────────────────────────────────────────────────────────
// 2025/26: 6% on £12,570–£50,270, 2% above £50,270
describe("calculateClass4NationalInsurance (25/26)", () => {
  test("£12,570 (at lower profits limit) — returns 0", () => {
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2025/26",
        grossAnnualProfit: 12_570,
      })
    ).toBe(0);
  });

  test("£10,000 (below lower profits limit) — returns 0", () => {
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2025/26",
        grossAnnualProfit: 10_000,
      })
    ).toBe(0);
  });

  test("£30,000", () => {
    // (30000 - 12570) × 6% = 17430 × 0.06 = 1045.80
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2025/26",
        grossAnnualProfit: 30_000,
      })
    ).toBeCloseTo(1045.8, 1);
  });

  test("£50,270 (at upper profits limit)", () => {
    // (50270 - 12570) × 6% = 37700 × 0.06 = 2262.00
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2025/26",
        grossAnnualProfit: 50_270,
      })
    ).toBeCloseTo(2262.0, 1);
  });

  test("£80,000 (above upper profits limit)", () => {
    // main: (50270 - 12570) × 6% = 2262
    // additional: (80000 - 50270) × 2% = 29730 × 0.02 = 594.60
    // total: 2856.60
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2025/26",
        grossAnnualProfit: 80_000,
      })
    ).toBeCloseTo(2856.6, 1);
  });

  test("£150,000", () => {
    // main: 37700 × 6% = 2262
    // additional: (150000 - 50270) × 2% = 99730 × 0.02 = 1994.60
    // total: 4256.60
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2025/26",
        grossAnnualProfit: 150_000,
      })
    ).toBeCloseTo(4256.6, 1);
  });
});

// 2024/25: same rates as 2025/26 for Class 4
describe("calculateClass4NationalInsurance (24/25)", () => {
  test("£30,000", () => {
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2024/25",
        grossAnnualProfit: 30_000,
      })
    ).toBeCloseTo(1045.8, 1);
  });

  test("£80,000", () => {
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2024/25",
        grossAnnualProfit: 80_000,
      })
    ).toBeCloseTo(2856.6, 1);
  });
});

// 2026/27: same rates as 2025/26 for Class 4 (thresholds frozen)
describe("calculateClass4NationalInsurance (26/27)", () => {
  test("£30,000", () => {
    // (30000 - 12570) × 6% = 17430 × 0.06 = 1045.80
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2026/27",
        grossAnnualProfit: 30_000,
      })
    ).toBeCloseTo(1045.8, 1);
  });

  test("£80,000", () => {
    // main: (50270 - 12570) × 6% = 2262
    // additional: (80000 - 50270) × 2% = 29730 × 0.02 = 594.60
    // total: 2856.60
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2026/27",
        grossAnnualProfit: 80_000,
      })
    ).toBeCloseTo(2856.6, 1);
  });
});

// 2022/23: 9.73% on £11,908–£50,270, 2.73% above
describe("calculateClass4NationalInsurance (22/23)", () => {
  test("£11,908 (at lower profits limit) — returns 0", () => {
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2022/23",
        grossAnnualProfit: 11_908,
      })
    ).toBe(0);
  });

  test("£30,000", () => {
    // (30000 - 11908) × 9.73% = 18092 × 0.0973 = 1760.35
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2022/23",
        grossAnnualProfit: 30_000,
      })
    ).toBeCloseTo(1760.4, 0);
  });

  test("£80,000", () => {
    // main: (50270 - 11908) × 9.73% = 38362 × 0.0973 = 3732.62
    // additional: (80000 - 50270) × 2.73% = 29730 × 0.0273 = 811.63
    // total: 4544.25
    expect(
      calculateClass4NationalInsurance({
        taxYear: "2022/23",
        grossAnnualProfit: 80_000,
      })
    ).toBeCloseTo(4544.3, 0);
  });
});
