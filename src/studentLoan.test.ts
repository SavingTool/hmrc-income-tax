import { calculateStudentLoanRepayments } from "./studentLoan";

const expectationsPlan1 = [
  { taxableAnnualIncome: 15_000, repayments: 0 },
  { taxableAnnualIncome: 17_500, repayments: 0 },
  { taxableAnnualIncome: 20_000, repayments: 0 },
  { taxableAnnualIncome: 22_500, repayments: 209.1599999999999 },
  { taxableAnnualIncome: 25_000, repayments: 434.16 },
  { taxableAnnualIncome: 50_000, repayments: 2684.16 },
  { taxableAnnualIncome: 55_000, repayments: 3134.1599999999994 },
  { taxableAnnualIncome: 60_000, repayments: 3584.1599999999994 },
  { taxableAnnualIncome: 75_000, repayments: 4934.16 },
  { taxableAnnualIncome: 90_000, repayments: 6284.16 },
  { taxableAnnualIncome: 110_000, repayments: 8084.159999999999 },
  { taxableAnnualIncome: 120_000, repayments: 8984.16 },
  { taxableAnnualIncome: 124_500, repayments: 9389.16 },
  { taxableAnnualIncome: 125_000, repayments: 9434.159999999998 },
  { taxableAnnualIncome: 130_000, repayments: 9884.16 },
  { taxableAnnualIncome: 145_000, repayments: 11234.16 },
  { taxableAnnualIncome: 160_000, repayments: 12584.160000000002 },
  { taxableAnnualIncome: 175_000, repayments: 13934.159999999998 },
  { taxableAnnualIncome: 200_000, repayments: 16184.160000000002 },
  { taxableAnnualIncome: 250_000, repayments: 20684.16 },
  { taxableAnnualIncome: 500_000, repayments: 43184.159999999996 },
  { taxableAnnualIncome: 1_000_000, repayments: 88184.15999999999 },
];

describe("calculateStudentLoanRepayments", () => {
  describe("Plan 1 loans", () => {
    expectationsPlan1.forEach((expectation) => {
      const { taxableAnnualIncome, repayments } = expectation;
      test(taxableAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            taxableAnnualIncome,
            studentLoanPlanNo: 1,
          })
        ).toEqual(repayments);
      });
    });
  });
});
