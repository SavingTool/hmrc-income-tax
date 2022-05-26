import { calculateStudentLoanRepayments } from "./studentLoan";

const expectationsPlan1 = [
  { taxableAnnualIncome: 15_000, repayments: 0 },
  { taxableAnnualIncome: 17_500, repayments: 0 },
  { taxableAnnualIncome: 20_000, repayments: 12.240000000000123 },
  { taxableAnnualIncome: 22_500, repayments: 237.23999999999992 },
  { taxableAnnualIncome: 25_000, repayments: 462.24 },
  { taxableAnnualIncome: 50_000, repayments: 2712.24 },
  { taxableAnnualIncome: 55_000, repayments: 3162.24 },
  { taxableAnnualIncome: 60_000, repayments: 3612.24 },
  { taxableAnnualIncome: 75_000, repayments: 4962.24 },
  { taxableAnnualIncome: 90_000, repayments: 6312.24 },
  { taxableAnnualIncome: 110_000, repayments: 8112.239999999999 },
  { taxableAnnualIncome: 120_000, repayments: 9012.24 },
  { taxableAnnualIncome: 124_500, repayments: 9417.239999999998 },
  { taxableAnnualIncome: 125_000, repayments: 9462.24 },
  { taxableAnnualIncome: 130_000, repayments: 9912.24 },
  { taxableAnnualIncome: 145_000, repayments: 11262.24 },
  { taxableAnnualIncome: 160_000, repayments: 12612.240000000002 },
  { taxableAnnualIncome: 175_000, repayments: 13962.239999999998 },
  { taxableAnnualIncome: 200_000, repayments: 16212.24 },
  { taxableAnnualIncome: 250_000, repayments: 20712.239999999998 },
  { taxableAnnualIncome: 500_000, repayments: 43212.24 },
  { taxableAnnualIncome: 1_000_000, repayments: 88212.23999999999 },
];

describe("calculateStudentLoanRepayments", () => {
  describe("Plan 1 loans", () => {
    expectationsPlan1.forEach((expectation) => {
      const { taxableAnnualIncome, repayments } = expectation;
      test(taxableAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxableAnnualIncome,
            studentLoanPlanNo: 1,
          })
        ).toEqual(repayments);
      });
    });
  });
});
