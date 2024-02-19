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
    higher: 29548,
    additional: 8293.5,
  },
  {
    taxableAnnualIncome: 145_000,
    basic: 7540,
    higher: 29548,
    additional: 15043.5,
  },
  {
    taxableAnnualIncome: 160_000,
    basic: 7540,
    higher: 29548,
    additional: 21793.5,
  },
  {
    taxableAnnualIncome: 175_000,
    basic: 7540,
    higher: 29548,
    additional: 28543.5,
  },
  {
    taxableAnnualIncome: 200_000,
    basic: 7540,
    higher: 29548,
    additional: 39793.5,
  },
  {
    taxableAnnualIncome: 250_000,
    basic: 7540,
    higher: 29548,
    additional: 62293.5,
  },
  {
    taxableAnnualIncome: 500_000,
    basic: 7540,
    higher: 29548,
    additional: 174793.5,
  },
  {
    taxableAnnualIncome: 1_000_000,
    basic: 7540,
    higher: 29548,
    additional: 399793.5,
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
