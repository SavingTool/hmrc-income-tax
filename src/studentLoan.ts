import { getHmrcRates } from "./hmrc";

import type { StudentLoanPlan, TaxYear, Country } from "./types";

// Calculates an individual's annual student loan repayments
// Note that student loan repayments do not take into account the personal allowance in any way, it's a simple threshold system
export const calculateStudentLoanRepayments = ({
  taxYear,
  country,
  taxableAnnualIncome,
  studentLoanPlanNo,
}: {
  taxYear?: TaxYear;
  country?: Country;
  taxableAnnualIncome: number;
  studentLoanPlanNo: StudentLoanPlan;
}): number => {
  const {
    STUDENT_LOAN_PLAN_1_WEEKLY_THRESHOLD,
    STUDENT_LOAN_PLAN_2_WEEKLY_THRESHOLD,
    STUDENT_LOAN_PLAN_4_WEEKLY_THRESHOLD,
    STUDENT_LOAN_PLAN_5_WEEKLY_THRESHOLD,
    STUDENT_LOAN_POSTGRAD_WEEKLY_THRESHOLD,
    STUDENT_LOAN_REPAYMENT_AMOUNT,
    STUDENT_LOAN_REPAYMENT_AMOUNT_POSTGRAD,
  } = getHmrcRates({ taxYear, country });
  let studentLoanAnnualRepayments = 0;

  // Repayments are a % of income over HMRC-specified thresholds (threshold amount depends on plan number)

  let threshold: number | undefined;

  switch (studentLoanPlanNo) {
    case 1: {
      threshold = STUDENT_LOAN_PLAN_1_WEEKLY_THRESHOLD;
      break;
    }
    case 2: {
      threshold = STUDENT_LOAN_PLAN_2_WEEKLY_THRESHOLD;
      break;
    }
    case 4: {
      threshold = STUDENT_LOAN_PLAN_4_WEEKLY_THRESHOLD;
      break;
    }
    case 5: {
      threshold = STUDENT_LOAN_PLAN_5_WEEKLY_THRESHOLD;
      break;
    }
    case "postgrad": {
      threshold = STUDENT_LOAN_POSTGRAD_WEEKLY_THRESHOLD;
      break;
    }
    default: {
      throw new Error(
        `Student loan plan must be one of: 1, 2, 4, 5 or 'postgrad' (was: ${studentLoanPlanNo})`
      );
    }
  }

  const weeklySalary = taxableAnnualIncome / 52;
  const repaymentAmount =
    studentLoanPlanNo === "postgrad"
      ? STUDENT_LOAN_REPAYMENT_AMOUNT_POSTGRAD
      : STUDENT_LOAN_REPAYMENT_AMOUNT;

  if (weeklySalary > threshold) {
    studentLoanAnnualRepayments =
      (weeklySalary - threshold) * repaymentAmount * 52;
  }

  return studentLoanAnnualRepayments;
};
