import { calculateStudentLoanRepayments } from "./studentLoan";

describe("calculateStudentLoanRepayments", () => {
  const expectationsPlan1 = [
    { taxableAnnualIncome: 15_000, repayments: 0 },
    { taxableAnnualIncome: 17_500, repayments: 0 },
    { taxableAnnualIncome: 20_000, repayments: 0 },
    { taxableAnnualIncome: 22_500, repayments: 209.16 },
    { taxableAnnualIncome: 25_000, repayments: 434.16 },
    { taxableAnnualIncome: 50_000, repayments: 2684.16 },
    { taxableAnnualIncome: 55_000, repayments: 3134.16 },
    { taxableAnnualIncome: 60_000, repayments: 3584.16 },
    { taxableAnnualIncome: 75_000, repayments: 4934.16 },
    { taxableAnnualIncome: 90_000, repayments: 6284.16 },
    { taxableAnnualIncome: 110_000, repayments: 8084.16 },
    { taxableAnnualIncome: 120_000, repayments: 8984.16 },
    { taxableAnnualIncome: 124_500, repayments: 9389.16 },
    { taxableAnnualIncome: 125_000, repayments: 9434.16 },
    { taxableAnnualIncome: 130_000, repayments: 9884.16 },
    { taxableAnnualIncome: 145_000, repayments: 11234.16 },
    { taxableAnnualIncome: 160_000, repayments: 12584.16 },
    { taxableAnnualIncome: 175_000, repayments: 13934.16 },
    { taxableAnnualIncome: 200_000, repayments: 16184.16 },
    { taxableAnnualIncome: 250_000, repayments: 20684.16 },
    { taxableAnnualIncome: 500_000, repayments: 43184.16 },
    { taxableAnnualIncome: 1_000_000, repayments: 88184.16 },
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
    { taxableAnnualIncome: 50_000, repayments: 2047.68 },
    { taxableAnnualIncome: 55_000, repayments: 2497.68 },
    { taxableAnnualIncome: 60_000, repayments: 2947.68 },
    { taxableAnnualIncome: 75_000, repayments: 4297.68 },
    { taxableAnnualIncome: 90_000, repayments: 5647.68 },
    { taxableAnnualIncome: 110_000, repayments: 7447.68 },
    { taxableAnnualIncome: 120_000, repayments: 8347.68 },
    { taxableAnnualIncome: 124_500, repayments: 8752.68 },
    { taxableAnnualIncome: 125_000, repayments: 8797.68 },
    { taxableAnnualIncome: 130_000, repayments: 9247.68 },
    { taxableAnnualIncome: 145_000, repayments: 10597.68 },
    { taxableAnnualIncome: 160_000, repayments: 11947.68 },
    { taxableAnnualIncome: 175_000, repayments: 13297.68 },
    { taxableAnnualIncome: 200_000, repayments: 15547.68 },
    { taxableAnnualIncome: 250_000, repayments: 20047.68 },
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
    { taxableAnnualIncome: 50_000, repayments: 2216.25 },
    { taxableAnnualIncome: 55_000, repayments: 2666.25 },
    { taxableAnnualIncome: 60_000, repayments: 3116.25 },
    { taxableAnnualIncome: 75_000, repayments: 4466.25 },
    { taxableAnnualIncome: 90_000, repayments: 5816.25 },
    { taxableAnnualIncome: 110_000, repayments: 7616.25 },
    { taxableAnnualIncome: 120_000, repayments: 8516.25 },
    { taxableAnnualIncome: 124_500, repayments: 8921.25 },
    { taxableAnnualIncome: 125_000, repayments: 8966.25 },
    { taxableAnnualIncome: 130_000, repayments: 9416.25 },
    { taxableAnnualIncome: 145_000, repayments: 10766.25 },
    { taxableAnnualIncome: 160_000, repayments: 12116.25 },
    { taxableAnnualIncome: 175_000, repayments: 13466.25 },
    { taxableAnnualIncome: 200_000, repayments: 15716.25 },
    { taxableAnnualIncome: 250_000, repayments: 20216.25 },
    { taxableAnnualIncome: 500_000, repayments: 42716.25 },
    { taxableAnnualIncome: 1_000_000, repayments: 87716.25 },
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
    { taxableAnnualIncome: 25_000, repayments: 3.6 },
    { taxableAnnualIncome: 50_000, repayments: 2253.6 },
    { taxableAnnualIncome: 55_000, repayments: 2703.6 },
    { taxableAnnualIncome: 60_000, repayments: 3153.6 },
    { taxableAnnualIncome: 75_000, repayments: 4503.6 },
    { taxableAnnualIncome: 90_000, repayments: 5853.6 },
    { taxableAnnualIncome: 110_000, repayments: 7653.6 },
    { taxableAnnualIncome: 120_000, repayments: 8553.6 },
    { taxableAnnualIncome: 124_500, repayments: 8958.6 },
    { taxableAnnualIncome: 125_000, repayments: 9003.6 },
    { taxableAnnualIncome: 130_000, repayments: 9453.6 },
    { taxableAnnualIncome: 145_000, repayments: 10803.6 },
    { taxableAnnualIncome: 160_000, repayments: 12153.6 },
    { taxableAnnualIncome: 175_000, repayments: 13503.6 },
    { taxableAnnualIncome: 200_000, repayments: 15753.6 },
    { taxableAnnualIncome: 250_000, repayments: 20253.6 },
    { taxableAnnualIncome: 500_000, repayments: 42753.6 },
    { taxableAnnualIncome: 1_000_000, repayments: 87753.6 },
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
    { taxableAnnualIncome: 22_500, repayments: 90.02 },
    { taxableAnnualIncome: 25_000, repayments: 240.02 },
    { taxableAnnualIncome: 50_000, repayments: 1740.02 },
    { taxableAnnualIncome: 55_000, repayments: 2040.02 },
    { taxableAnnualIncome: 60_000, repayments: 2340.02 },
    { taxableAnnualIncome: 75_000, repayments: 3240.02 },
    { taxableAnnualIncome: 90_000, repayments: 4140.02 },
    { taxableAnnualIncome: 110_000, repayments: 5340.02 },
    { taxableAnnualIncome: 120_000, repayments: 5940.02 },
    { taxableAnnualIncome: 124_500, repayments: 6210.02 },
    { taxableAnnualIncome: 125_000, repayments: 6240.02 },
    { taxableAnnualIncome: 130_000, repayments: 6540.02 },
    { taxableAnnualIncome: 145_000, repayments: 7440.02 },
    { taxableAnnualIncome: 160_000, repayments: 8340.02 },
    { taxableAnnualIncome: 175_000, repayments: 9240.02 },
    { taxableAnnualIncome: 200_000, repayments: 10740.02 },
    { taxableAnnualIncome: 250_000, repayments: 13740.02 },
    { taxableAnnualIncome: 500_000, repayments: 28740.02 },
    { taxableAnnualIncome: 1_000_000, repayments: 58740.02 },
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
