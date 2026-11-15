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
      expect(
        calculatePersonalAllowance({ taxYear: "2022/23", taxableAnnualIncome })
      ).toEqual(allowance);
    });
  });
});

// Income Tax Act 2007 s.35(3): a tapered allowance that isn't a whole number of pounds
// is rounded up to the next £1.
// https://www.legislation.gov.uk/ukpga/2007/3/section/35
describe("calculatePersonalAllowance rounding", () => {
  test.each([
    { taxableAnnualIncome: 100_000, allowance: 12_570 },
    { taxableAnnualIncome: 100_000.01, allowance: 12_570 },
    { taxableAnnualIncome: 100_001, allowance: 12_570 },
    { taxableAnnualIncome: 100_002, allowance: 12_569 },
    { taxableAnnualIncome: 100_003, allowance: 12_569 },
    { taxableAnnualIncome: 110_001, allowance: 7_570 },
    { taxableAnnualIncome: 125_138, allowance: 1 },
    { taxableAnnualIncome: 125_139, allowance: 1 },
    { taxableAnnualIncome: 125_139.99, allowance: 1 },
    { taxableAnnualIncome: 125_140, allowance: 0 },
    { taxableAnnualIncome: 125_141, allowance: 0 },
  ])(
    "£$taxableAnnualIncome → £$allowance",
    ({ taxableAnnualIncome, allowance }) => {
      expect(
        calculatePersonalAllowance({ taxYear: "2026/27", taxableAnnualIncome })
      ).toBe(allowance);
    }
  );

  test("float noise in a whole-pound income doesn't round the allowance up", () => {
    // 102,414 − 0.00000000001 (e.g. from salary − pension arithmetic) → allowance £11,363
    expect(
      calculatePersonalAllowance({
        taxYear: "2026/27",
        taxableAnnualIncome: 102_413.99999999999,
      })
    ).toBe(11_363);
  });
});
