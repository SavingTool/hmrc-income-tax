import {
  calculateEmployeeNationalInsurance,
  calculateEmployerNationalInsurance,
} from "./nationalInsurance";

const expectationsA = [
  { taxableAnnualIncome: 15_000, nics: 320.11999999999995 },
  { taxableAnnualIncome: 17_500, nics: 651.3700000000001 },
  { taxableAnnualIncome: 20_000, nics: 982.6200000000002 },
  { taxableAnnualIncome: 22_500, nics: 1313.87 },
  { taxableAnnualIncome: 25_000, nics: 1645.1200000000001 },
  { taxableAnnualIncome: 50_000, nics: 4957.620000000001 },
  { taxableAnnualIncome: 55_000, nics: 5148.5199999999995 },
  { taxableAnnualIncome: 60_000, nics: 5311.02 },
  { taxableAnnualIncome: 75_000, nics: 5798.52 },
  { taxableAnnualIncome: 90_000, nics: 6286.0199999999995 },
  { taxableAnnualIncome: 110_000, nics: 6936.0199999999995 },
  { taxableAnnualIncome: 130_000, nics: 7586.0199999999995 },
  { taxableAnnualIncome: 150_000, nics: 8236.02 },
  { taxableAnnualIncome: 175_000, nics: 9048.52 },
  { taxableAnnualIncome: 200_000, nics: 9861.02 },
  { taxableAnnualIncome: 250_000, nics: 11486.02 },
  { taxableAnnualIncome: 500_000, nics: 19611.02 },
  { taxableAnnualIncome: 1_000_000, nics: 35861.02 },
];

describe("calculateEmployeeNationalInsurance (22/23)", () => {
  expectationsA.forEach((expectation) => {
    const { taxableAnnualIncome, nics } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      expect(
        calculateEmployeeNationalInsurance({
          taxYear: "2022/23",
          taxableAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

const expectationsB = [
  { taxableAnnualIncome: 15_000, nics: 241.59 },
  { taxableAnnualIncome: 17_500, nics: 491.6 },
  { taxableAnnualIncome: 20_000, nics: 741.6 },
  { taxableAnnualIncome: 22_500, nics: 991.59 },
  { taxableAnnualIncome: 25_000, nics: 1241.6 },
  { taxableAnnualIncome: 50_000, nics: 3741.6 },
  { taxableAnnualIncome: 55_000, nics: 3864.32 },
  { taxableAnnualIncome: 60_000, nics: 3964.32 },
  { taxableAnnualIncome: 75_000, nics: 4264.32 },
  { taxableAnnualIncome: 90_000, nics: 4564.32 },
  { taxableAnnualIncome: 110_000, nics: 4964.32 },
  { taxableAnnualIncome: 130_000, nics: 5364.32 },
  { taxableAnnualIncome: 150_000, nics: 5764.32 },
  { taxableAnnualIncome: 175_000, nics: 6264.32 },
  { taxableAnnualIncome: 200_000, nics: 6764.32 },
  { taxableAnnualIncome: 250_000, nics: 7764.32 },
  { taxableAnnualIncome: 500_000, nics: 12764.32 },
  { taxableAnnualIncome: 1_000_000, nics: 22764.32 },
];

describe("calculateEmployeeNationalInsurance (23/24)", () => {
  expectationsB.forEach((expectation) => {
    const { taxableAnnualIncome, nics } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      expect(
        calculateEmployeeNationalInsurance({
          taxYear: "2023/24",
          taxableAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

const expectationsC = [
  { taxableAnnualIncome: 15_000, nics: 193.28 },
  { taxableAnnualIncome: 17_500, nics: 393.28 },
  { taxableAnnualIncome: 20_000, nics: 593.28 },
  { taxableAnnualIncome: 22_500, nics: 793.28 },
  { taxableAnnualIncome: 25_000, nics: 993.28 },
  { taxableAnnualIncome: 50_000, nics: 2993.28 },
  { taxableAnnualIncome: 55_000, nics: 3110.32 },
  { taxableAnnualIncome: 60_000, nics: 3210.32 },
  { taxableAnnualIncome: 75_000, nics: 3510.32 },
  { taxableAnnualIncome: 90_000, nics: 3810.32 },
  { taxableAnnualIncome: 110_000, nics: 4210.32 },
  { taxableAnnualIncome: 130_000, nics: 4610.32 },
  { taxableAnnualIncome: 150_000, nics: 5010.32 },
  { taxableAnnualIncome: 175_000, nics: 5510.32 },
  { taxableAnnualIncome: 200_000, nics: 6010.32 },
  { taxableAnnualIncome: 250_000, nics: 7010.32 },
  { taxableAnnualIncome: 500_000, nics: 12010.32 },
  { taxableAnnualIncome: 1_000_000, nics: 22010.32 },
];

describe("calculateEmployeeNationalInsurance (24/25)", () => {
  expectationsC.forEach((expectation) => {
    const { taxableAnnualIncome, nics } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      expect(
        calculateEmployeeNationalInsurance({
          taxYear: "2024/25",
          taxableAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

// Employer NI (Class 1, Category A): 13.8% above £175/week secondary threshold
const employerExpectations2425 = [
  { taxableAnnualIncome: 9_100, nics: 0 }, // at secondary threshold (£175/week × 52)
  { taxableAnnualIncome: 10_000, nics: 124.2 }, // (10000 - 9100) × 13.8%
  { taxableAnnualIncome: 20_000, nics: 1504.2 },
  { taxableAnnualIncome: 30_000, nics: 2884.2 },
  { taxableAnnualIncome: 50_000, nics: 5644.2 },
  { taxableAnnualIncome: 75_000, nics: 9094.2 },
  { taxableAnnualIncome: 100_000, nics: 12544.2 },
  { taxableAnnualIncome: 150_000, nics: 19444.2 },
];

describe("calculateEmployerNationalInsurance (24/25)", () => {
  employerExpectations2425.forEach((expectation) => {
    const { taxableAnnualIncome, nics } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      expect(
        calculateEmployerNationalInsurance({
          taxYear: "2024/25",
          taxableAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});

// Employer NI (Class 1, Category A): 15% above £96/week secondary threshold (from April 2025)
const employerExpectations2526 = [
  { taxableAnnualIncome: 4_992, nics: 0 }, // at secondary threshold (£96/week × 52)
  { taxableAnnualIncome: 10_000, nics: 751.2 }, // (10000 - 4992) × 15%
  { taxableAnnualIncome: 20_000, nics: 2251.2 },
  { taxableAnnualIncome: 30_000, nics: 3751.2 },
  { taxableAnnualIncome: 50_000, nics: 6751.2 },
  { taxableAnnualIncome: 75_000, nics: 10501.2 },
  { taxableAnnualIncome: 100_000, nics: 14251.2 },
  { taxableAnnualIncome: 150_000, nics: 21751.2 },
];

describe("calculateEmployerNationalInsurance (25/26)", () => {
  employerExpectations2526.forEach((expectation) => {
    const { taxableAnnualIncome, nics } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      expect(
        calculateEmployerNationalInsurance({
          taxYear: "2025/26",
          taxableAnnualIncome,
        })
      ).toBeCloseTo(nics, 1);
    });
  });
});
