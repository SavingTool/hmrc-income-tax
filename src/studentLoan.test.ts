import { calculateStudentLoanRepayments } from "./studentLoan";

describe("calculateStudentLoanRepayments", () => {
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

  const expectationsPlan2 = [
    { taxableAnnualIncome: 15_000, repayments: 0 },
    { taxableAnnualIncome: 17_500, repayments: 0 },
    { taxableAnnualIncome: 20_000, repayments: 0 },
    { taxableAnnualIncome: 22_500, repayments: 0 },
    { taxableAnnualIncome: 25_000, repayments: 0 },
    { taxableAnnualIncome: 50_000, repayments: 2047.6799999999998 },
    { taxableAnnualIncome: 55_000, repayments: 2497.6799999999994 },
    { taxableAnnualIncome: 60_000, repayments: 2947.68 },
    { taxableAnnualIncome: 75_000, repayments: 4297.68 },
    { taxableAnnualIncome: 90_000, repayments: 5647.679999999999 },
    { taxableAnnualIncome: 110_000, repayments: 7447.6799999999985 },
    { taxableAnnualIncome: 120_000, repayments: 8347.68 },
    { taxableAnnualIncome: 124_500, repayments: 8752.679999999998 },
    { taxableAnnualIncome: 125_000, repayments: 8797.68 },
    { taxableAnnualIncome: 130_000, repayments: 9247.68 },
    { taxableAnnualIncome: 145_000, repayments: 10597.68 },
    { taxableAnnualIncome: 160_000, repayments: 11947.68 },
    { taxableAnnualIncome: 175_000, repayments: 13297.679999999998 },
    { taxableAnnualIncome: 200_000, repayments: 15547.68 },
    { taxableAnnualIncome: 250_000, repayments: 20047.679999999997 },
    { taxableAnnualIncome: 500_000, repayments: 42547.68 },
    { taxableAnnualIncome: 1_000_000, repayments: 87547.68 },
  ];

  describe("Plan 2 loans", () => {
    expectationsPlan2.forEach((expectation) => {
      const { taxableAnnualIncome, repayments } = expectation;
      test(taxableAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            taxableAnnualIncome,
            studentLoanPlanNo: 2,
          })
        ).toEqual(repayments);
      });
    });
  });

  const expectationsPlan4 = [
    { taxableAnnualIncome: 15_000, repayments: 0 },
    { taxableAnnualIncome: 17_500, repayments: 0 },
    { taxableAnnualIncome: 20_000, repayments: 0 },
    { taxableAnnualIncome: 22_500, repayments: 0 },
    { taxableAnnualIncome: 25_000, repayments: 0 },
    { taxableAnnualIncome: 50_000, repayments: 2216.2536 },
    { taxableAnnualIncome: 55_000, repayments: 2666.2535999999996 },
    { taxableAnnualIncome: 60_000, repayments: 3116.2535999999996 },
    { taxableAnnualIncome: 75_000, repayments: 4466.2536 },
    { taxableAnnualIncome: 90_000, repayments: 5816.2536 },
    { taxableAnnualIncome: 110_000, repayments: 7616.253599999999 },
    { taxableAnnualIncome: 120_000, repayments: 8516.253599999998 },
    { taxableAnnualIncome: 124_500, repayments: 8921.2536 },
    { taxableAnnualIncome: 125_000, repayments: 8966.253599999998 },
    { taxableAnnualIncome: 130_000, repayments: 9416.2536 },
    { taxableAnnualIncome: 145_000, repayments: 10766.2536 },
    { taxableAnnualIncome: 160_000, repayments: 12116.2536 },
    { taxableAnnualIncome: 175_000, repayments: 13466.253599999998 },
    { taxableAnnualIncome: 200_000, repayments: 15716.253599999998 },
    { taxableAnnualIncome: 250_000, repayments: 20216.253599999996 },
    { taxableAnnualIncome: 500_000, repayments: 42716.253600000004 },
    { taxableAnnualIncome: 1_000_000, repayments: 87716.2536 },
  ];

  describe("Plan 4 loans", () => {
    expectationsPlan4.forEach((expectation) => {
      const { taxableAnnualIncome, repayments } = expectation;
      test(taxableAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            taxableAnnualIncome,
            studentLoanPlanNo: 4,
          })
        ).toEqual(repayments);
      });
    });
  });

  const expectationsPlan5 = [
    { taxableAnnualIncome: 15_000, repayments: 0 },
    { taxableAnnualIncome: 17_500, repayments: 0 },
    { taxableAnnualIncome: 20_000, repayments: 0 },
    { taxableAnnualIncome: 22_500, repayments: 0 },
    { taxableAnnualIncome: 25_000, repayments: 3.6000000000000205 },
    { taxableAnnualIncome: 50_000, repayments: 2253.6 },
    { taxableAnnualIncome: 55_000, repayments: 2703.5999999999995 },
    { taxableAnnualIncome: 60_000, repayments: 3153.6 },
    { taxableAnnualIncome: 75_000, repayments: 4503.599999999999 },
    { taxableAnnualIncome: 90_000, repayments: 5853.599999999999 },
    { taxableAnnualIncome: 110_000, repayments: 7653.599999999999 },
    { taxableAnnualIncome: 120_000, repayments: 8553.6 },
    { taxableAnnualIncome: 124_500, repayments: 8958.599999999999 },
    { taxableAnnualIncome: 125_000, repayments: 9003.599999999999 },
    { taxableAnnualIncome: 130_000, repayments: 9453.599999999999 },
    { taxableAnnualIncome: 145_000, repayments: 10803.6 },
    { taxableAnnualIncome: 160_000, repayments: 12153.6 },
    { taxableAnnualIncome: 175_000, repayments: 13503.599999999999 },
    { taxableAnnualIncome: 200_000, repayments: 15753.599999999999 },
    { taxableAnnualIncome: 250_000, repayments: 20253.6 },
    { taxableAnnualIncome: 500_000, repayments: 42753.6 },
    { taxableAnnualIncome: 1_000_000, repayments: 87753.59999999999 },
  ];

  describe("Plan 5 loans", () => {
    expectationsPlan5.forEach((expectation) => {
      const { taxableAnnualIncome, repayments } = expectation;
      test(taxableAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            taxableAnnualIncome,
            studentLoanPlanNo: 5,
          })
        ).toEqual(repayments);
      });
    });
  });

  const expectationsPostgrad = [
    { taxableAnnualIncome: 15_000, repayments: 0 },
    { taxableAnnualIncome: 17_500, repayments: 0 },
    { taxableAnnualIncome: 20_000, repayments: 0 },
    { taxableAnnualIncome: 22_500, repayments: 90.01920000000004 },
    { taxableAnnualIncome: 25_000, repayments: 240.0192000000001 },
    { taxableAnnualIncome: 50_000, repayments: 1740.0192 },
    { taxableAnnualIncome: 55_000, repayments: 2040.0192000000002 },
    { taxableAnnualIncome: 60_000, repayments: 2340.0192 },
    { taxableAnnualIncome: 75_000, repayments: 3240.0192 },
    { taxableAnnualIncome: 90_000, repayments: 4140.019200000001 },
    { taxableAnnualIncome: 110_000, repayments: 5340.0192 },
    { taxableAnnualIncome: 120_000, repayments: 5940.0192 },
    { taxableAnnualIncome: 124_500, repayments: 6210.0192 },
    { taxableAnnualIncome: 125_000, repayments: 6240.0192 },
    { taxableAnnualIncome: 130_000, repayments: 6540.019199999999 },
    { taxableAnnualIncome: 145_000, repayments: 7440.019199999999 },
    { taxableAnnualIncome: 160_000, repayments: 8340.019199999999 },
    { taxableAnnualIncome: 175_000, repayments: 9240.019199999999 },
    { taxableAnnualIncome: 200_000, repayments: 10740.019199999999 },
    { taxableAnnualIncome: 250_000, repayments: 13740.019199999999 },
    { taxableAnnualIncome: 500_000, repayments: 28740.0192 },
    { taxableAnnualIncome: 1_000_000, repayments: 58740.01919999999 },
  ];

  describe("Postgrad loans", () => {
    expectationsPostgrad.forEach((expectation) => {
      const { taxableAnnualIncome, repayments } = expectation;
      test(taxableAnnualIncome.toString(), () => {
        expect(
          calculateStudentLoanRepayments({
            taxYear: "2022/23",
            taxableAnnualIncome,
            studentLoanPlanNo: "postgrad",
          })
        ).toEqual(repayments);
      });
    });
  });
});
