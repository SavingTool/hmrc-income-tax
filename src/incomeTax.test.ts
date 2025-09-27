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

// Scotland, 2024/25
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
    starterRateTax: 438.33,
    basicRateTax: 24.6,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 17_500,
    starterRateTax: 438.33,
    basicRateTax: 524.6,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 20_000,
    starterRateTax: 438.33,
    basicRateTax: 1024.6000000000001,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 22_500,
    starterRateTax: 438.33,
    basicRateTax: 1524.6000000000001,
    intermediateRateTax: 0,
    higherRateTax: 0,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 50_000,
    starterRateTax: 438.33,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 2661.54,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 75_000,
    starterRateTax: 438.33,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.539999999999,
    advancedRateTax: 0,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 90_000,
    starterRateTax: 438.33,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 6749.55,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 110_000,
    starterRateTax: 438.33,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 17999.55,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 125_000,
    starterRateTax: 438.33,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 28124.55,
    topRateTax: 0,
  },
  {
    taxableAnnualIncome: 150_000,
    starterRateTax: 438.33,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 28219.05,
    topRateTax: 11932.8,
  },
  // See: https://www.bbc.co.uk/news/uk-scotland-67760641
  {
    taxableAnnualIncome: 200_000,
    starterRateTax: 438.33,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 28219.05,
    topRateTax: 35932.799999999996,
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
      expect(taxAmounts.breakdown).toEqual(rest);
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
      expect(result.total).toBeGreaterThan(0);
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

      expect(result.total).toBeGreaterThan(0);
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
      expect(result.total).toBeGreaterThan(0);
      // Type assertion to access Scottish-specific properties
      if (result.incomeTaxType === "Scotland") {
        expect(typeof result.breakdown.starterRateTax).toBe("number");
      }
    });
  });
});
