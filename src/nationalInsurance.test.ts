import { calculateEmployeeNationalInsurance } from "./nationalInsurance";

const expectations = [
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

describe("calculateEmployeeNationalInsurance", () => {
  expectations.forEach((expectation) => {
    const { taxableAnnualIncome, nics } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      expect(
        calculateEmployeeNationalInsurance({ taxableAnnualIncome })
      ).toEqual(nics);
    });
  });
});
