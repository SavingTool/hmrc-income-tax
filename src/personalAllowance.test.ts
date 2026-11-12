import { calculateIncomeTax } from "./incomeTax";
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

// Income Tax Act 2007 s.35(2): the allowance "is reduced by one-half of the excess" over £100,000.
// s.35(3): "If the amount of any allowance that remains after the operation of subsection (2)
// would otherwise not be a multiple of £1, it is to be rounded up to the nearest amount which is
// a multiple of £1." https://www.legislation.gov.uk/ukpga/2007/3/section/35
const roundedUpExpectations = [
  { taxableAnnualIncome: 100_000, allowance: 12570 },
  { taxableAnnualIncome: 100_000.01, allowance: 12570 }, // 12,569.995 remains
  { taxableAnnualIncome: 100_001, allowance: 12570 }, // 12,569.50 remains
  { taxableAnnualIncome: 100_002, allowance: 12569 }, // a whole pound: nothing to round
  { taxableAnnualIncome: 100_003, allowance: 12569 }, // 12,568.50 remains
  { taxableAnnualIncome: 100_003.2, allowance: 12569 }, // 12,568.40 remains
  { taxableAnnualIncome: 107_043, allowance: 9049 }, // 9,048.50 remains
  { taxableAnnualIncome: 114_019, allowance: 5561 }, // 5,560.50 remains
  { taxableAnnualIncome: 125_138, allowance: 1 },
  { taxableAnnualIncome: 125_139, allowance: 1 }, // 0.50 remains
  { taxableAnnualIncome: 125_139.99, allowance: 1 }, // 0.005 remains
  { taxableAnnualIncome: 125_140, allowance: 0 },
  { taxableAnnualIncome: 125_141, allowance: 0 },
];

describe("calculatePersonalAllowance rounds a tapered allowance up to a whole pound (ITA 2007 s.35(3))", () => {
  (["England/NI/Wales", "Scotland"] as const).forEach((country) => {
    roundedUpExpectations.forEach(({ taxableAnnualIncome, allowance }) => {
      test(`${country} ${taxableAnnualIncome}`, () => {
        expect(
          calculatePersonalAllowance({
            taxYear: "2026/27",
            country,
            taxableAnnualIncome,
          })
        ).toBe(allowance);
      });
    });
  });

  test("binary float noise in the income does not lift a whole-pound allowance", () => {
    // £204,828 less a 50% pension is 102,414, but this expression is 102,413.99999999999
    const taxableAnnualIncome = 204_828 - (204_828 / 100) * 50;
    expect(taxableAnnualIncome).not.toBe(102_414);
    expect(
      calculatePersonalAllowance({ taxYear: "2026/27", taxableAnnualIncome })
    ).toBe(11363); // 12,570 - 2,414 / 2
  });

  test("income tax at £100,001 is charged on £87,431, not £87,431.50", () => {
    const taxableAnnualIncome = 100_001;
    const english = calculateIncomeTax({
      taxYear: "2026/27",
      taxableAnnualIncome,
      personalAllowance: calculatePersonalAllowance({
        taxYear: "2026/27",
        taxableAnnualIncome,
      }),
    });
    // 37,700 @ 20% = 7,540; 49,731 @ 40% = 19,892.40
    expect(english.total).toBeCloseTo(27_432.4, 2);

    const scottish = calculateIncomeTax({
      taxYear: "2026/27",
      country: "Scotland",
      taxableAnnualIncome,
      personalAllowance: calculatePersonalAllowance({
        taxYear: "2026/27",
        country: "Scotland",
        taxableAnnualIncome,
      }),
    });
    // 753.73 + 2,597.80 + 2,968.56 + 13,161.96 + 25,001 @ 45% = 11,250.45
    expect(scottish.breakdown).toMatchObject({ topRateTax: 0 });
    expect(scottish.total).toBeCloseTo(30_732.5, 2);
  });

  test("just under £125,140 the allowance is £1 and no Scottish income reaches the top rate", () => {
    const taxableAnnualIncome = 125_139;
    const scottish = calculateIncomeTax({
      taxYear: "2026/27",
      country: "Scotland",
      taxableAnnualIncome,
      personalAllowance: calculatePersonalAllowance({
        taxYear: "2026/27",
        country: "Scotland",
        taxableAnnualIncome,
      }),
    });
    // taxable 125,138: advanced 62,708 @ 45% = 28,218.60
    expect(scottish.breakdown.advancedRateTax).toBeCloseTo(28_218.6, 2);
    expect(scottish.breakdown.topRateTax).toBe(0);
    expect(scottish.total).toBeCloseTo(47_700.65, 2);
  });
});
