import { calculateIncomeTax } from "./incomeTax";
import { calculatePersonalAllowance } from "./personalAllowance";

// England, 2023/24
const expectationsA = [
  { taxableAnnualIncome: 0, basic: 0, higher: 0, additional: 0 },
  { taxableAnnualIncome: 5_000, basic: 0, higher: 0, additional: 0 },
  { taxableAnnualIncome: 15_000, basic: 486, higher: 0, additional: 0 },
  { taxableAnnualIncome: 17_500, basic: 986, higher: 0, additional: 0 },
  { taxableAnnualIncome: 20_000, basic: 1486, higher: 0, additional: 0 },
  { taxableAnnualIncome: 22_500, basic: 1986, higher: 0, additional: 0 },
  { taxableAnnualIncome: 25_000, basic: 2486, higher: 0, additional: 0 },
  { taxableAnnualIncome: 50_000, basic: 7486, higher: 0, additional: 0 },
  { taxableAnnualIncome: 55_000, basic: 7540, higher: 1892, additional: 0 },
  { taxableAnnualIncome: 60_000, basic: 7540, higher: 3892, additional: 0 },
  { taxableAnnualIncome: 75_000, basic: 7540, higher: 9892, additional: 0 },
  { taxableAnnualIncome: 90_000, basic: 7540, higher: 15892, additional: 0 },
  { taxableAnnualIncome: 105_000, basic: 7540, higher: 22892, additional: 0 },
  { taxableAnnualIncome: 110_000, basic: 7540, higher: 25892, additional: 0 },
  {
    taxableAnnualIncome: 130_000,
    basic: 7540,
    higher: 34976,
    additional: 2187,
  },
  {
    taxableAnnualIncome: 145_000,
    basic: 7540,
    higher: 34976,
    additional: 8937,
  },
  {
    taxableAnnualIncome: 160_000,
    basic: 7540,
    higher: 34976,
    additional: 15687,
  },
  {
    taxableAnnualIncome: 175_000,
    basic: 7540,
    higher: 34976,
    additional: 22437,
  },
  {
    taxableAnnualIncome: 200_000,
    basic: 7540,
    higher: 34976,
    additional: 33687,
  },
  {
    taxableAnnualIncome: 250_000,
    basic: 7540,
    higher: 34976,
    additional: 56187,
  },
  {
    taxableAnnualIncome: 500_000,
    basic: 7540,
    higher: 34976,
    additional: 168687,
  },
  {
    taxableAnnualIncome: 1_000_000,
    basic: 7540,
    higher: 34976,
    additional: 393687,
  },
];

describe("calculateIncomeTax (23/24)", () => {
  expectationsA.forEach((expectation) => {
    const { taxableAnnualIncome, basic, higher, additional } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      const personalAllowance = calculatePersonalAllowance({
        taxYear: "2023/24",
        taxableAnnualIncome,
      });
      const taxAmounts = calculateIncomeTax({
        taxYear: "2023/24",
        taxableAnnualIncome,
        personalAllowance,
      });
      expect(taxAmounts.breakdown).toEqual({
        basicRateTax: basic,
        higherRateTax: higher,
        additionalRateTax: additional,
      });
    });
  });
});

// England, 2024/25
const expectationsB = [
  { taxableAnnualIncome: 0, basic: 0, higher: 0, additional: 0 },
  { taxableAnnualIncome: 5_000, basic: 0, higher: 0, additional: 0 },
  { taxableAnnualIncome: 15_000, basic: 486, higher: 0, additional: 0 },
  { taxableAnnualIncome: 17_500, basic: 986, higher: 0, additional: 0 },
  { taxableAnnualIncome: 20_000, basic: 1486, higher: 0, additional: 0 },
  { taxableAnnualIncome: 22_500, basic: 1986, higher: 0, additional: 0 },
  { taxableAnnualIncome: 25_000, basic: 2486, higher: 0, additional: 0 },
  { taxableAnnualIncome: 50_000, basic: 7486, higher: 0, additional: 0 },
  { taxableAnnualIncome: 55_000, basic: 7540, higher: 1892, additional: 0 },
  { taxableAnnualIncome: 60_000, basic: 7540, higher: 3892, additional: 0 },
  { taxableAnnualIncome: 75_000, basic: 7540, higher: 9892, additional: 0 },
  { taxableAnnualIncome: 90_000, basic: 7540, higher: 15892, additional: 0 },
  { taxableAnnualIncome: 105_000, basic: 7540, higher: 22892, additional: 0 },
  { taxableAnnualIncome: 110_000, basic: 7540, higher: 25892, additional: 0 },
  {
    taxableAnnualIncome: 130_000,
    basic: 7540,
    higher: 34976,
    additional: 2187,
  },
  {
    taxableAnnualIncome: 145_000,
    basic: 7540,
    higher: 34976,
    additional: 8937,
  },
  {
    taxableAnnualIncome: 160_000,
    basic: 7540,
    higher: 34976,
    additional: 15687,
  },
  {
    taxableAnnualIncome: 175_000,
    basic: 7540,
    higher: 34976,
    additional: 22437,
  },
  {
    taxableAnnualIncome: 200_000,
    basic: 7540,
    higher: 34976,
    additional: 33687,
  },
  {
    taxableAnnualIncome: 250_000,
    basic: 7540,
    higher: 34976,
    additional: 56187,
  },
  {
    taxableAnnualIncome: 500_000,
    basic: 7540,
    higher: 34976,
    additional: 168687,
  },
  {
    taxableAnnualIncome: 1_000_000,
    basic: 7540,
    higher: 34976,
    additional: 393687,
  },
];

describe("calculateIncomeTax (24/25)", () => {
  expectationsB.forEach((expectation) => {
    const { taxableAnnualIncome, basic, higher, additional } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      const personalAllowance = calculatePersonalAllowance({
        taxYear: "2024/25",
        taxableAnnualIncome,
      });
      const taxAmounts = calculateIncomeTax({
        taxYear: "2024/25",
        taxableAnnualIncome,
        personalAllowance,
      });
      expect(taxAmounts.breakdown).toEqual({
        basicRateTax: basic,
        higherRateTax: higher,
        additionalRateTax: additional,
      });
    });
  });
});

// England, 2026/27 — income tax thresholds frozen (same as 2024/25 and 2025/26)
describe("calculateIncomeTax (26/27)", () => {
  expectationsB.forEach((expectation) => {
    const { taxableAnnualIncome, basic, higher, additional } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      const personalAllowance = calculatePersonalAllowance({
        taxYear: "2026/27",
        taxableAnnualIncome,
      });
      const taxAmounts = calculateIncomeTax({
        taxYear: "2026/27",
        taxableAnnualIncome,
        personalAllowance,
      });
      expect(taxAmounts.breakdown).toEqual({
        basicRateTax: basic,
        higherRateTax: higher,
        additionalRateTax: additional,
      });
    });
  });
});

// Scotland, 2024/25: starter to £14,876, basic to £26,561, intermediate to £43,662,
// higher to £75,000, advanced to £125,140 (gov.scot "Scottish Income Tax: rates and bands 2024 to 2025")
const expectationsC = [
  {
    taxableAnnualIncome: 0,
    starterRateTax: 0,
    basicRateTax: 0,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 5_000,
    starterRateTax: 0,
    basicRateTax: 0,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 15_000,
    starterRateTax: 438.14, // 2,306 @ 19%
    basicRateTax: 24.8, // 124 @ 20%
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 17_500,
    starterRateTax: 438.14,
    basicRateTax: 524.8,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 20_000,
    starterRateTax: 438.14,
    basicRateTax: 1024.8,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 22_500,
    starterRateTax: 438.14,
    basicRateTax: 1524.8,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 50_000,
    starterRateTax: 438.14,
    basicRateTax: 2337, // 11,685 @ 20%
    intermediateRateTax: 3591.21, // 17,101 @ 21%
    higherRateTax: 2661.96, // 6,338 @ 42%
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 75_000,
    starterRateTax: 438.14,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96, // the full higher band: 31,338 @ 42%
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 90_000,
    starterRateTax: 438.14,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 6750, // 15,000 @ 45%
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 110_000,
    starterRateTax: 438.14,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 18000, // PA 7,570; taxable 102,430; 40,000 @ 45%
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 125_000,
    starterRateTax: 438.14,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 28125, // PA 70; taxable 124,930; 62,500 @ 45%
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 150_000,
    starterRateTax: 438.14,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 28219.5, // the full advanced band: 62,710 @ 45%
    topRateTax: 11932.8, // 24,860 @ 48%
  },
  // See: https://www.bbc.co.uk/news/uk-scotland-67760641
  {
    taxableAnnualIncome: 200_000,
    starterRateTax: 438.14,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 28219.5,
    topRateTax: 35932.8,
  },
];

// Using this which looks like a good reference:
// https://spice-spotlight.scot/2024/01/16/how-much-income-tax-will-i-pay-in-2024-25/

describe("calculateIncomeTax (24/25) - Scotland", () => {
  expectationsC.forEach((expectation) => {
    const { taxableAnnualIncome, ...rest } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      const personalAllowance = calculatePersonalAllowance({
        country: "Scotland",
        taxYear: "2024/25",
        taxableAnnualIncome,
      });
      const taxAmounts = calculateIncomeTax({
        taxYear: "2024/25",
        country: "Scotland",
        taxableAnnualIncome,
        personalAllowance,
      });
      (Object.keys(rest) as (keyof typeof rest)[]).forEach((band) => {
        expect(taxAmounts.breakdown[band]).toBeCloseTo(rest[band], 2);
      });
    });
  });
});

// Cumulative PAYE tests - Example from the issue
describe("calculateIncomeTax - Cumulative PAYE Mode", () => {
  describe("Issue example: £10,000 in month 1, then £0 for months 2-12", () => {
    const taxYear = "2024/25";

    test("Month 1: £10,000 gross income should result in £1,790 tax", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 10_000,
          cumulativeTaxPaid: 0,
        },
      });

      // The expected result from the issue is £1,790
      // Personal allowance for month 1: £12,570 / 12 = £1,047.50
      // Taxable income: £10,000 - £1,047.50 = £8,952.50
      // Tax: £8,952.50 * 20% = £1,790.50
      expect(result.total).toBeCloseTo(1790.5, 1);
    });

    test("Month 2: £0 additional income should result in £0 additional tax", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 2,
          cumulativeGrossIncome: 10_000, // Same as month 1
          cumulativeTaxPaid: 1790, // Tax paid in month 1
        },
      });

      expect(result.total).toBeCloseTo(0, 0);
    });

    test("Month 12: Still £0 additional income should result in £0 additional tax", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 12,
          cumulativeGrossIncome: 10_000, // Same as month 1
          cumulativeTaxPaid: 1790, // Tax paid in month 1
        },
      });

      expect(result.total).toBeCloseTo(0, 0);
    });
  });

  describe("Validation tests", () => {
    test("Should throw error for invalid month number (< 1)", () => {
      expect(() => {
        calculateIncomeTax({
          cumulativePaye: {
            monthNumber: 0,
            cumulativeGrossIncome: 1000,
            cumulativeTaxPaid: 0,
          },
        });
      }).toThrow("monthNumber must be between 1 and 12");
    });

    test("Should throw error for invalid month number (> 12)", () => {
      expect(() => {
        calculateIncomeTax({
          cumulativePaye: {
            monthNumber: 13,
            cumulativeGrossIncome: 1000,
            cumulativeTaxPaid: 0,
          },
        });
      }).toThrow("monthNumber must be between 1 and 12");
    });

    test("Should throw error when missing required parameters in standard mode", () => {
      expect(() => {
        calculateIncomeTax({
          // Missing both taxableAnnualIncome and personalAllowance
        });
      }).toThrow(
        "taxableAnnualIncome and personalAllowance are required when not using cumulativePaye mode"
      );
    });
  });

  describe("Progressive income throughout the year", () => {
    const taxYear = "2024/25";

    test("Month 1: £3,000 income", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 3_000,
          cumulativeTaxPaid: 0,
        },
      });

      // Income below personal allowance pro-rata (£12,570 / 12 = £1,047.50)
      // So £3,000 is above the monthly allowance, some tax should be due
      // If this person earns nothing more in the year, this would be later refunded by HMRC
      expect(result.total).toBeCloseTo(390.5, 1);
    });

    test("Month 6: £18,000 cumulative income", () => {
      const month1Tax = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 3_000,
          cumulativeTaxPaid: 0,
        },
      }).total;

      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 6,
          cumulativeGrossIncome: 18_000,
          cumulativeTaxPaid: month1Tax,
        },
      });

      expect(result.total).toBeCloseTo(1952.5, 1);
    });
  });

  describe("Personal allowance tapering in cumulative PAYE", () => {
    const taxYear = "2025/26";

    test("High earner (£100k) should have full personal allowance in month 1", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 100_000,
          cumulativeTaxPaid: 0,
        },
      });

      // At £100k, PA tapering just starts, so full PA should apply
      // Expected: (£100k - £12,570/12) * rates = roughly £32k
      expect(result.total).toBeCloseTo(32041, 0);
    });

    test("High earner (£110k) should have reduced personal allowance", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 110_000,
          cumulativeTaxPaid: 0,
        },
      });

      // At £110k, PA should be reduced by £5k (£10k over threshold / 2)
      // PA = £12,570 - £5,000 = £7,570, monthly = £630.83

      // Tax at 20% should be £7,540
      // Tax at 40% should be £25,892
      // Total = £33,432
      expect(result.total).toBeCloseTo(33432, 0);
    });

    test("Very high earner (£125,140) should have no personal allowance", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 125_140,
          cumulativeTaxPaid: 0,
        },
      });

      // At £125,140, PA should be completely tapered away
      // PA = £0, monthly = £0
      expect(result.total).toBeCloseTo(42516, 0);
    });

    test("Personal allowance tapering should work across multiple months", () => {
      // Month 1: £60k
      const month1 = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 60_000,
          cumulativeTaxPaid: 0,
        },
      });

      expect(month1.total).toBeCloseTo(16041, 1);

      // Month 6: £110k cumulative (£50k more, now in tapering territory)
      const month6 = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 6,
          cumulativeGrossIncome: 110_000,
          cumulativeTaxPaid: month1.total,
        },
      });

      expect(month6.total).toBeCloseTo(17391, 1);
    });

    test("Should handle Scottish rates with personal allowance tapering", () => {
      const result = calculateIncomeTax({
        taxYear,
        country: "Scotland",
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 110_000,
          cumulativeTaxPaid: 0,
        },
      });

      // PA 7,570 -> taxable 102,430: 537.13 + 2,418.80 + 3,395.91 + 13,161.96 + 40,000 @ 45% = 37,513.80
      expect(result.total).toBeCloseTo(37513.8, 1);
      expect(result.incomeTaxType).toBe("Scotland");
    });
  });

  describe("Comparison with annualized approach (demonstrating the issue)", () => {
    const taxYear = "2024/25";

    test("Annualized approach gives incorrect result", () => {
      // This is what you get if you annualize £10,000 * 12 and divide by 12
      const annualizedIncome = 10_000 * 12; // £120,000
      const personalAllowance = calculatePersonalAllowance({
        taxYear,
        taxableAnnualIncome: annualizedIncome,
      });

      const annualTax = calculateIncomeTax({
        taxYear,
        taxableAnnualIncome: annualizedIncome,
        personalAllowance,
      });

      const monthlyTaxFromAnnual = annualTax.total / 12;

      // This should be around £3,286 (considering personal allowance tapering at £120k income)
      expect(monthlyTaxFromAnnual).toBeCloseTo(3286, 0);

      // But PAYE should give £1,790.50
      const payeResult = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 10_000,
          cumulativeTaxPaid: 0,
        },
      });

      expect(payeResult.total).toBeCloseTo(1790.5, 1);
      expect(payeResult.total).toBeLessThan(monthlyTaxFromAnnual);
    });
  });

  describe("Year-long example with variable income", () => {
    const taxYear = "2024/25";
    let cumulativeTaxPaid = 0;

    test("Month 1: £10,000 income", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 10_000,
          cumulativeTaxPaid,
        },
      });

      expect(result.total).toBeCloseTo(1790.5, 1);
      cumulativeTaxPaid += result.total;
    });

    test("Month 2: Additional £5,000 income", () => {
      const result = calculateIncomeTax({
        taxYear,
        cumulativePaye: {
          monthNumber: 2,
          cumulativeGrossIncome: 15_000,
          cumulativeTaxPaid,
        },
      });

      // Month 2 allowance: £12,570 * 2 / 12 = £2,095
      // Cumulative taxable: £15,000 - £2,095 = £12,905
      // Cumulative tax due: £12,905 * 20% = £2,581
      // Monthly tax: £2,581 - £1,790.5 = £790.5
      expect(result.total).toBeCloseTo(790.5, 1);
      cumulativeTaxPaid += result.total;
    });
  });

  describe("Scotland cumulative PAYE", () => {
    const taxYear = "2024/25";

    test("Month 1: £10,000 income in Scotland", () => {
      const result = calculateIncomeTax({
        taxYear,
        country: "Scotland",
        cumulativePaye: {
          monthNumber: 1,
          cumulativeGrossIncome: 10_000,
          cumulativeTaxPaid: 0,
        },
      });

      expect(result.incomeTaxType).toBe("Scotland");
      // PA 12,570 / 12 = 1,047.50; taxable 8,952.50: 2,306 @ 19% = 438.14 + 6,646.50 @ 20% = 1,329.30
      expect(result.total).toBeCloseTo(1767.44, 2);

      if (result.incomeTaxType === "Scotland") {
        expect(typeof result.breakdown.starterRateTax).toBe("number");
      }
    });
  });
});

// Scotland, 2026/27 — starter up to £16,537, basic £16,538–£29,526, intermediate £29,527–£43,662
describe("calculateIncomeTax (26/27) - Scotland", () => {
  const calculate = (taxableAnnualIncome: number) => {
    const personalAllowance = calculatePersonalAllowance({
      country: "Scotland",
      taxYear: "2026/27",
      taxableAnnualIncome,
    });
    return calculateIncomeTax({
      taxYear: "2026/27",
      country: "Scotland",
      taxableAnnualIncome,
      personalAllowance,
    }).breakdown;
  };

  test("income at the top of the starter band", () => {
    const breakdown = calculate(16_537);
    expect(breakdown.starterRateTax).toBeCloseTo(754, 0);
    expect(breakdown.basicRateTax).toBe(0);
  });

  test("income at the top of the basic band", () => {
    const breakdown = calculate(29_526);
    expect(breakdown.starterRateTax).toBeCloseTo(754, 0);
    expect(breakdown.basicRateTax).toBeCloseTo(2_598, 0);
    expect(breakdown.intermediateRateTax).toBe(0);
  });

  test("income at the top of the intermediate band", () => {
    const breakdown = calculate(43_662);
    expect(breakdown.intermediateRateTax).toBeCloseTo(2_968.56, 2); // 14,136 @ 21%
    expect(breakdown.higherRateTax).toBe(0);
  });

  test("income £1 into each band is taxed at that band's rate", () => {
    // starter 3,967 @ 19% = 753.73; basic 12,989 @ 20% = 2,597.80; intermediate 14,136 @ 21% = 2,968.56;
    // higher 31,338 @ 42% = 13,161.96; advanced 62,710 @ 45% = 28,219.50
    expect(calculate(16_538).basicRateTax).toBeCloseTo(0.2, 2);
    expect(calculate(29_527).intermediateRateTax).toBeCloseTo(0.21, 2);
    expect(calculate(43_663).higherRateTax).toBeCloseTo(0.42, 2);
    expect(calculate(75_001).advancedRateTax).toBeCloseTo(0.45, 2);
    const atTop = calculate(125_140); // PA fully tapered: taxable income 125,140
    expect(atTop.advancedRateTax).toBeCloseTo(28_219.5, 2);
    expect(atTop.topRateTax).toBe(0);
    expect(calculate(125_141).topRateTax).toBeCloseTo(0.48, 2);
  });

  test("£58,000 less a 5% pension: 11,124.05", () => {
    // taxable income 55,100 -> 42,530 after PA: 753.73 + 2,597.80 + 2,968.56 + 11,438 @ 42% = 4,803.96
    const personalAllowance = calculatePersonalAllowance({
      country: "Scotland",
      taxYear: "2026/27",
      taxableAnnualIncome: 55_100,
    });
    const result = calculateIncomeTax({
      taxYear: "2026/27",
      country: "Scotland",
      taxableAnnualIncome: 55_100,
      personalAllowance,
    });
    expect(result.breakdown).toMatchObject({
      advancedRateTax: 0,
      topRateTax: 0,
    });
    expect(result.breakdown.higherRateTax).toBeCloseTo(4_803.96, 2);
    expect(result.total).toBeCloseTo(11_124.05, 2);
  });
});

// Scotland, 2025/26 — starter to £15,397, basic to £27,491 (Scottish Rate Resolution 2025-26:
// starter limit £2,827 and basic limit £14,921 of taxable income)
describe("calculateIncomeTax (25/26) - Scotland", () => {
  const calculate = (taxableAnnualIncome: number) => {
    const personalAllowance = calculatePersonalAllowance({
      country: "Scotland",
      taxYear: "2025/26",
      taxableAnnualIncome,
    });
    return calculateIncomeTax({
      taxYear: "2025/26",
      country: "Scotland",
      taxableAnnualIncome,
      personalAllowance,
    }).breakdown;
  };

  test("band boundaries", () => {
    expect(calculate(15_397).starterRateTax).toBeCloseTo(537.13, 2); // 2,827 @ 19%
    expect(calculate(15_397).basicRateTax).toBe(0);
    expect(calculate(27_491).basicRateTax).toBeCloseTo(2_418.8, 2); // 12,094 @ 20%
    expect(calculate(27_491).intermediateRateTax).toBe(0);
    expect(calculate(43_662).intermediateRateTax).toBeCloseTo(3_395.91, 2); // 16,171 @ 21%
    expect(calculate(43_662).higherRateTax).toBe(0);
    expect(calculate(75_000).higherRateTax).toBeCloseTo(13_161.96, 2); // 31,338 @ 42%
    expect(calculate(75_000).advancedRateTax).toBe(0);
  });
});
