import { calculateStudentLoanRepayments } from "./studentLoan";

describe("calculateStudentLoanRepayments", () => {
  const expectationsPlan1 = [
    { grossAnnualIncome: 15_000, repayments: 0 },
    { grossAnnualIncome: 17_500, repayments: 0 },
    { grossAnnualIncome: 20_000, repayments: 0 },
    { grossAnnualIncome: 22_500, repayments: 209.1599999999999 },
    { grossAnnualIncome: 25_000, repayments: 434.16 },
    { grossAnnualIncome: 50_000, repayments: 2684.16 },
    { grossAnnualIncome: 55_000, repayments: 3134.1599999999994 },
    { grossAnnualIncome: 60_000, repayments: 3584.1599999999994 },
    { grossAnnualIncome: 75_000, repayments: 4934.16 },
    { grossAnnualIncome: 90_000, repayments: 6284.16 },
    { grossAnnualIncome: 110_000, repayments: 8084.159999999999 },
    { grossAnnualIncome: 120_000, repayments: 8984.16 },
    { grossAnnualIncome: 124_500, repayments: 9389.16 },
    { grossAnnualIncome: 125_000, repayments: 9434.159999999998 },
    { grossAnnualIncome: 130_000, repayments: 9884.16 },
    { grossAnnualIncome: 145_000, repayments: 11234.16 },
    { grossAnnualIncome: 160_000, repayments: 12584.160000000002 },
    { grossAnnualIncome: 175_000, repayments: 13934.159999999998 },
    { grossAnnualIncome: 200_000, repayments: 16184.160000000002 },
    { grossAnnualIncome: 250_000, repayments: 20684.16 },
    { grossAnnualIncome: 500_000, repayments: 43184.159999999996 },
    { grossAnnualIncome: 1_000_000, repayments: 88184.15999999999 },
  ];

  describe("Plan 1 loans", () => {
    expectationsPlan1.forEach((expectation) => {
      const { grossAnnualIncome, repayments } = expectation;
      test(grossAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            grossAnnualIncome,
            studentLoanPlanNo: 1,
          })
        ).toEqual(repayments);
      });
    });
  });

  const expectationsPlan2 = [
    { grossAnnualIncome: 15_000, repayments: 0 },
    { grossAnnualIncome: 17_500, repayments: 0 },
    { grossAnnualIncome: 20_000, repayments: 0 },
    { grossAnnualIncome: 22_500, repayments: 0 },
    { grossAnnualIncome: 25_000, repayments: 0 },
    { grossAnnualIncome: 50_000, repayments: 2047.6799999999998 },
    { grossAnnualIncome: 55_000, repayments: 2497.6799999999994 },
    { grossAnnualIncome: 60_000, repayments: 2947.68 },
    { grossAnnualIncome: 75_000, repayments: 4297.68 },
    { grossAnnualIncome: 90_000, repayments: 5647.679999999999 },
    { grossAnnualIncome: 110_000, repayments: 7447.6799999999985 },
    { grossAnnualIncome: 120_000, repayments: 8347.68 },
    { grossAnnualIncome: 124_500, repayments: 8752.679999999998 },
    { grossAnnualIncome: 125_000, repayments: 8797.68 },
    { grossAnnualIncome: 130_000, repayments: 9247.68 },
    { grossAnnualIncome: 145_000, repayments: 10597.68 },
    { grossAnnualIncome: 160_000, repayments: 11947.68 },
    { grossAnnualIncome: 175_000, repayments: 13297.679999999998 },
    { grossAnnualIncome: 200_000, repayments: 15547.68 },
    { grossAnnualIncome: 250_000, repayments: 20047.679999999997 },
    { grossAnnualIncome: 500_000, repayments: 42547.68 },
    { grossAnnualIncome: 1_000_000, repayments: 87547.68 },
  ];

  describe("Plan 2 loans", () => {
    expectationsPlan2.forEach((expectation) => {
      const { grossAnnualIncome, repayments } = expectation;
      test(grossAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            grossAnnualIncome,
            studentLoanPlanNo: 2,
          })
        ).toEqual(repayments);
      });
    });
  });

  const expectationsPlan4 = [
    { grossAnnualIncome: 15_000, repayments: 0 },
    { grossAnnualIncome: 17_500, repayments: 0 },
    { grossAnnualIncome: 20_000, repayments: 0 },
    { grossAnnualIncome: 22_500, repayments: 0 },
    { grossAnnualIncome: 25_000, repayments: 0 },
    { grossAnnualIncome: 50_000, repayments: 2216.2536 },
    { grossAnnualIncome: 55_000, repayments: 2666.2535999999996 },
    { grossAnnualIncome: 60_000, repayments: 3116.2535999999996 },
    { grossAnnualIncome: 75_000, repayments: 4466.2536 },
    { grossAnnualIncome: 90_000, repayments: 5816.2536 },
    { grossAnnualIncome: 110_000, repayments: 7616.253599999999 },
    { grossAnnualIncome: 120_000, repayments: 8516.253599999998 },
    { grossAnnualIncome: 124_500, repayments: 8921.2536 },
    { grossAnnualIncome: 125_000, repayments: 8966.253599999998 },
    { grossAnnualIncome: 130_000, repayments: 9416.2536 },
    { grossAnnualIncome: 145_000, repayments: 10766.2536 },
    { grossAnnualIncome: 160_000, repayments: 12116.2536 },
    { grossAnnualIncome: 175_000, repayments: 13466.253599999998 },
    { grossAnnualIncome: 200_000, repayments: 15716.253599999998 },
    { grossAnnualIncome: 250_000, repayments: 20216.253599999996 },
    { grossAnnualIncome: 500_000, repayments: 42716.253600000004 },
    { grossAnnualIncome: 1_000_000, repayments: 87716.2536 },
  ];

  describe("Plan 4 loans", () => {
    expectationsPlan4.forEach((expectation) => {
      const { grossAnnualIncome, repayments } = expectation;
      test(grossAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            grossAnnualIncome,
            studentLoanPlanNo: 4,
          })
        ).toEqual(repayments);
      });
    });
  });

  const expectationsPlan5 = [
    { grossAnnualIncome: 15_000, repayments: 0 },
    { grossAnnualIncome: 17_500, repayments: 0 },
    { grossAnnualIncome: 20_000, repayments: 0 },
    { grossAnnualIncome: 22_500, repayments: 0 },
    { grossAnnualIncome: 25_000, repayments: 3.6000000000000205 },
    { grossAnnualIncome: 50_000, repayments: 2253.6 },
    { grossAnnualIncome: 55_000, repayments: 2703.5999999999995 },
    { grossAnnualIncome: 60_000, repayments: 3153.6 },
    { grossAnnualIncome: 75_000, repayments: 4503.599999999999 },
    { grossAnnualIncome: 90_000, repayments: 5853.599999999999 },
    { grossAnnualIncome: 110_000, repayments: 7653.599999999999 },
    { grossAnnualIncome: 120_000, repayments: 8553.6 },
    { grossAnnualIncome: 124_500, repayments: 8958.599999999999 },
    { grossAnnualIncome: 125_000, repayments: 9003.599999999999 },
    { grossAnnualIncome: 130_000, repayments: 9453.599999999999 },
    { grossAnnualIncome: 145_000, repayments: 10803.6 },
    { grossAnnualIncome: 160_000, repayments: 12153.6 },
    { grossAnnualIncome: 175_000, repayments: 13503.599999999999 },
    { grossAnnualIncome: 200_000, repayments: 15753.599999999999 },
    { grossAnnualIncome: 250_000, repayments: 20253.6 },
    { grossAnnualIncome: 500_000, repayments: 42753.6 },
    { grossAnnualIncome: 1_000_000, repayments: 87753.59999999999 },
  ];

  describe("Plan 5 loans", () => {
    expectationsPlan5.forEach((expectation) => {
      const { grossAnnualIncome, repayments } = expectation;
      test(grossAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            grossAnnualIncome,
            studentLoanPlanNo: 5,
          })
        ).toEqual(repayments);
      });
    });
  });

  const expectationsPostgrad = [
    { grossAnnualIncome: 15_000, repayments: 0 },
    { grossAnnualIncome: 17_500, repayments: 0 },
    { grossAnnualIncome: 20_000, repayments: 0 },
    { grossAnnualIncome: 22_500, repayments: 90.01920000000004 },
    { grossAnnualIncome: 25_000, repayments: 240.0192000000001 },
    { grossAnnualIncome: 50_000, repayments: 1740.0192 },
    { grossAnnualIncome: 55_000, repayments: 2040.0192000000002 },
    { grossAnnualIncome: 60_000, repayments: 2340.0192 },
    { grossAnnualIncome: 75_000, repayments: 3240.0192 },
    { grossAnnualIncome: 90_000, repayments: 4140.019200000001 },
    { grossAnnualIncome: 110_000, repayments: 5340.0192 },
    { grossAnnualIncome: 120_000, repayments: 5940.0192 },
    { grossAnnualIncome: 124_500, repayments: 6210.0192 },
    { grossAnnualIncome: 125_000, repayments: 6240.0192 },
    { grossAnnualIncome: 130_000, repayments: 6540.019199999999 },
    { grossAnnualIncome: 145_000, repayments: 7440.019199999999 },
    { grossAnnualIncome: 160_000, repayments: 8340.019199999999 },
    { grossAnnualIncome: 175_000, repayments: 9240.019199999999 },
    { grossAnnualIncome: 200_000, repayments: 10740.019199999999 },
    { grossAnnualIncome: 250_000, repayments: 13740.019199999999 },
    { grossAnnualIncome: 500_000, repayments: 28740.0192 },
    { grossAnnualIncome: 1_000_000, repayments: 58740.01919999999 },
  ];

  describe("Postgrad loans", () => {
    expectationsPostgrad.forEach((expectation) => {
      const { grossAnnualIncome, repayments } = expectation;
      test(grossAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            grossAnnualIncome,
            studentLoanPlanNo: "postgrad",
          })
        ).toEqual(repayments);
      });
    });
  });
});
