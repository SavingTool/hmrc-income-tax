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
  // {
  //   taxableAnnualIncome: 105_000,
  //   starterRateTax: 438.33,
  //   basicRateTax: 2337,
  //   intermediateRateTax: 3591.21,
  //   higherRateTax: 13161.96,
  //   advancedRateTax: 14624.550000000001,
  //   topRateTax: 0,
  // },
  // {
  //   taxableAnnualIncome: 125_000,
  //   starterRateTax: 438.33,
  //   basicRateTax: 2337,
  //   intermediateRateTax: 3591.21,
  //   higherRateTax: 13161.96,
  //   advancedRateTax: 22562.55,
  //   topRateTax: 5932.8,
  // },
  // {
  //   taxableAnnualIncome: 150_000,
  //   starterRateTax: 438.33,
  //   basicRateTax: 2337,
  //   intermediateRateTax: 3591.21,
  //   higherRateTax: 13161.96,
  //   advancedRateTax: 22562.55,
  //   topRateTax: 17966.399999999998,
  // },
  {
    taxableAnnualIncome: 250_000,
    starterRateTax: 438.33,
    basicRateTax: 2337,
    intermediateRateTax: 3591.21,
    higherRateTax: 13161.96,
    advancedRateTax: 28219.5,
    topRateTax: 59932.799999999996,
  },
  // {
  //   taxableAnnualIncome: 500_000,
  //   starterRateTax: 438.33,
  //   basicRateTax: 2337,
  //   intermediateRateTax: 3591.21,
  //   higherRateTax: 13161.96,
  //   advancedRateTax: 22562.55,
  //   topRateTax: 185966.4,
  // },
  // {
  //   taxableAnnualIncome: 1_000_000,
  //   starterRateTax: 438.33,
  //   basicRateTax: 2337,
  //   intermediateRateTax: 3591.21,
  //   higherRateTax: 13161.96,
  //   advancedRateTax: 22562.55,
  //   topRateTax: 425966.39999999997,
  // },
];

// { taxableAnnualIncome: 55_000, basic: 7540, higher: 1892, additional: 0 },
// { taxableAnnualIncome: 60_000, basic: 7540, higher: 3892, additional: 0 },
// { taxableAnnualIncome: 75_000, basic: 7540, higher: 9892, additional: 0 },
// { taxableAnnualIncome: 90_000, basic: 7540, higher: 15892, additional: 0 },
// { taxableAnnualIncome: 105_000, basic: 7540, higher: 22892, additional: 0 },
// { taxableAnnualIncome: 110_000, basic: 7540, higher: 25892, additional: 0 },

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
