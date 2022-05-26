import type { StudentLoanPlan, TaxYear } from "./types";
import { getHmrcRates } from "./hmrc";

// Calculates an individual's annual student loan repayments
// Note that student loan repayments do not take into account the personal allowance in any way, it's a simple threshold system
export const calculateStudentLoanRepayments = ({
  taxYear,
  taxableAnnualIncome,
  studentLoanPlanNo,
}: {
  taxYear?: TaxYear;
  taxableAnnualIncome: number;
  studentLoanPlanNo: StudentLoanPlan;
}): number => {
  const {
    STUDENT_LOAN_PLAN_1_WEEKLY_THRESHOLD,
    STUDENT_LOAN_PLAN_2_WEEKLY_THRESHOLD,
    STUDENT_LOAN_REPAYMENT_AMOUNT,
  } = getHmrcRates(taxYear);
  let studentLoanAnnualRepayments = 0;

  // Repayments are a % of income over HMRC-specified thresholds (threshold amount depends on plan number)
  const threshold =
    studentLoanPlanNo === 1
      ? STUDENT_LOAN_PLAN_1_WEEKLY_THRESHOLD
      : STUDENT_LOAN_PLAN_2_WEEKLY_THRESHOLD;
  const weeklySalary = taxableAnnualIncome / 52;

  if (weeklySalary > threshold) {
    studentLoanAnnualRepayments =
      (weeklySalary - threshold) * STUDENT_LOAN_REPAYMENT_AMOUNT * 52;
  }

  return studentLoanAnnualRepayments;
};
