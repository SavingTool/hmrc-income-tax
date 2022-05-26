import { calculatePersonalAllowance } from "./personalAllowance";

const expectations = [
  { taxableAnnualIncome: 15_000, allowance: 12570 },
  { taxableAnnualIncome: 17_500, allowance: 12570 },
  { taxableAnnualIncome: 20_000, allowance: 12570 },
  { taxableAnnualIncome: 22_500, allowance: 12570 },
  { taxableAnnualIncome: 25_000, allowance: 12570 },
  { taxableAnnualIncome: 50_000, allowance: 12570 },
  { taxableAnnualIncome: 55_000, allowance: 12570 },
  { taxableAnnualIncome: 60_000, allowance: 12570 },
  { taxableAnnualIncome: 75_000, allowance: 12570 },
  { taxableAnnualIncome: 90_000, allowance: 12570 },
  { taxableAnnualIncome: 110_000, allowance: 7570 },
  { taxableAnnualIncome: 120_000, allowance: 2570 },
  { taxableAnnualIncome: 124_500, allowance: 320 },
  { taxableAnnualIncome: 125_000, allowance: 70 },
  { taxableAnnualIncome: 130_000, allowance: 0 },
  { taxableAnnualIncome: 145_000, allowance: 0 },
  { taxableAnnualIncome: 160_000, allowance: 0 },
  { taxableAnnualIncome: 175_000, allowance: 0 },
  { taxableAnnualIncome: 200_000, allowance: 0 },
  { taxableAnnualIncome: 250_000, allowance: 0 },
  { taxableAnnualIncome: 500_000, allowance: 0 },
  { taxableAnnualIncome: 1_000_000, allowance: 0 },
];

describe("calculatePersonalAllowance", () => {
  expectations.forEach((expectation) => {
    const { taxableAnnualIncome, allowance } = expectation;
    test(taxableAnnualIncome.toString(), () => {
      expect(calculatePersonalAllowance({ taxableAnnualIncome })).toEqual(
        allowance
      );
    });
  });
});
