import { calculateIncomeTax } from "./incomeTax";
import { calculatePersonalAllowance } from "./personalAllowance";

const expectations = [
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

describe("calculateIncomeTax", () => {
  expectations.forEach((expectation) => {
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
      expect(taxAmounts).toEqual({
        basicRateTax: basic,
        higherRateTax: higher,
        additionalRateTax: additional,
      });
    });
  });
});
