import { calculateEmployeeNationalInsurance } from "./nationalInsurance";

const expectations = [
  { taxableAnnualIncome: 15_000, nics: 678.4 },
  { taxableAnnualIncome: 17_500, nics: 1009.6500000000001 },
  { taxableAnnualIncome: 20_000, nics: 1340.9000000000003 },
  { taxableAnnualIncome: 22_500, nics: 1672.15 },
  { taxableAnnualIncome: 25_000, nics: 2003.3999999999999 },
  { taxableAnnualIncome: 50_000, nics: 5315.900000000001 },
  { taxableAnnualIncome: 55_000, nics: 5506.8 },
  { taxableAnnualIncome: 60_000, nics: 5669.3 },
  { taxableAnnualIncome: 75_000, nics: 6156.8 },
  { taxableAnnualIncome: 90_000, nics: 6644.3 },
  { taxableAnnualIncome: 110_000, nics: 7294.3 },
  { taxableAnnualIncome: 130_000, nics: 7944.3 },
  { taxableAnnualIncome: 150_000, nics: 8594.300000000001 },
  { taxableAnnualIncome: 175_000, nics: 9406.800000000001 },
  { taxableAnnualIncome: 200_000, nics: 10219.300000000001 },
  { taxableAnnualIncome: 250_000, nics: 11844.300000000001 },
  { taxableAnnualIncome: 500_000, nics: 19969.3 },
  { taxableAnnualIncome: 1_000_000, nics: 36219.299999999996 },
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
