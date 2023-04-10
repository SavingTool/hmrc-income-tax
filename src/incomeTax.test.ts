import { calculateIncomeTax } from "./incomeTax";
import { calculatePersonalAllowance } from "./personalAllowance";

const expectations = [
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
  { taxableAnnualIncome: 110_000, basic: 7540, higher: 25892, additional: 0 },
  { taxableAnnualIncome: 130_000, basic: 7540, higher: 36920, additional: 0 },
  {
    taxableAnnualIncome: 145_000,
    basic: 7540,
    higher: 39892,
    additional: 3406.5,
  },
  {
    taxableAnnualIncome: 160_000,
    basic: 7540,
    higher: 39892,
    additional: 10156.5,
  },
  {
    taxableAnnualIncome: 175_000,
    basic: 7540,
    higher: 39892,
    additional: 16906.5,
  },
  {
    taxableAnnualIncome: 200_000,
    basic: 7540,
    higher: 39892,
    additional: 28156.5,
  },
  {
    taxableAnnualIncome: 250_000,
    basic: 7540,
    higher: 39892,
    additional: 50656.5,
  },
  {
    taxableAnnualIncome: 500_000,
    basic: 7540,
    higher: 39892,
    additional: 163156.5,
  },
  {
    taxableAnnualIncome: 1_000_000,
    basic: 7540,
    higher: 39892,
    additional: 388156.5,
  },
];

describe("calculateIncomeTax", () => {
  expectations.forEach((expectation) => {
    const { taxableAnnualIncome, basic, higher, additional } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      const personalAllowance = calculatePersonalAllowance({
        taxYear: "2022/23",
        taxableAnnualIncome,
      });
      expect(
        calculateIncomeTax({
          taxYear: "2022/23",
          taxableAnnualIncome,
          personalAllowance,
        })
      ).toEqual({
        basicRateTax: basic,
        higherRateTax: higher,
        additionalRateTax: additional,
      });
    });
  });
});
