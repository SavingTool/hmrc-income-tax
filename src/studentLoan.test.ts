import { calculateStudentLoanRepayments } from "./studentLoan";
import type { Country, StudentLoanPlan, TaxYear } from "./types";

// Official annual thresholds, from HMRC "Rates and thresholds for employers" for each year:
// https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2022-to-2023 (and later years)
// Plan 5 repayments only start from April 2026, but the £25,000 threshold is used throughout.
const officialAnnualThresholds: Record<
  TaxYear,
  Record<StudentLoanPlan, number>
> = {
  "2022/23": { 1: 20_195, 2: 27_295, 4: 25_375, 5: 25_000, postgrad: 21_000 },
  "2023/24": { 1: 22_015, 2: 27_295, 4: 27_660, 5: 25_000, postgrad: 21_000 },
  "2024/25": { 1: 24_990, 2: 27_295, 4: 31_395, 5: 25_000, postgrad: 21_000 },
  "2025/26": { 1: 26_065, 2: 28_470, 4: 32_745, 5: 25_000, postgrad: 21_000 },
  "2026/27": { 1: 26_900, 2: 29_385, 4: 33_795, 5: 25_000, postgrad: 21_000 },
};

const scottishTaxYears: TaxYear[] = ["2024/25", "2025/26", "2026/27"];
const plans: StudentLoanPlan[] = [1, 2, 4, 5, "postgrad"];
const incomes = [
  15_000, 22_500, 25_000, 30_000, 40_000, 60_000, 125_000, 1_000_000,
];

const expectedRepayment = (
  grossAnnualIncome: number,
  threshold: number,
  plan: StudentLoanPlan
) => {
  const rate = plan === "postgrad" ? 0.06 : 0.09;
  return Math.max(0, (grossAnnualIncome - threshold) * rate);
};

describe("calculateStudentLoanRepayments", () => {
  const cases: Array<{
    taxYear: TaxYear;
    country: Country;
    plan: StudentLoanPlan;
    threshold: number;
  }> = [];
  (Object.keys(officialAnnualThresholds) as TaxYear[]).forEach((taxYear) => {
    const countries: Country[] = scottishTaxYears.includes(taxYear)
      ? ["England/NI/Wales", "Scotland"]
      : ["England/NI/Wales"];
    countries.forEach((country) =>
      plans.forEach((plan) =>
        cases.push({
          taxYear,
          country,
          plan,
          threshold: officialAnnualThresholds[taxYear][plan],
        })
      )
    );
  });

  describe.each(cases)(
    "$taxYear $country plan $plan (threshold £$threshold)",
    ({ taxYear, country, plan, threshold }) => {
      test.each(incomes)("income £%d", (grossAnnualIncome) => {
        expect(
          calculateStudentLoanRepayments({
            taxYear,
            country,
            grossAnnualIncome,
            studentLoanPlanNo: plan,
          })
        ).toBeCloseTo(expectedRepayment(grossAnnualIncome, threshold, plan), 6);
      });

      test("nothing is repaid at exactly the threshold", () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear,
            country,
            grossAnnualIncome: threshold,
            studentLoanPlanNo: plan,
          })
        ).toBeCloseTo(0, 6);
      });
    }
  );

  // Regression: 2024/25 Plan 4 previously used the 2023/24 threshold (£27,660) — see issue #60
  test("2024/25 Plan 4 at £40,000 repays (40,000 − 31,395) × 9%", () => {
    expect(
      calculateStudentLoanRepayments({
        taxYear: "2024/25",
        grossAnnualIncome: 40_000,
        studentLoanPlanNo: 4,
      })
    ).toBeCloseTo(774.45, 6);
  });
});
