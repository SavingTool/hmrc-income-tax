import type { TaxYear } from "./types";

interface TaxRates {
  // Income Tax
  // See https://www.gov.uk/income-tax-rates
  DEFAULT_PERSONAL_ALLOWANCE: number;
  HIGHER_BRACKET: number;
  ADDITIONAL_BRACKET: number;
  BASIC_RATE: number;
  HIGHER_RATE: number;
  ADDITIONAL_RATE: number;
  PERSONAL_ALLOWANCE_DROPOFF: number;

  // Student loan repayments
  // See https://www.gov.uk/repaying-your-student-loan/what-you-pay
  // Previous rates: https://www.gov.uk/guidance/previous-annual-repayment-thresholds
  STUDENT_LOAN_PLAN_1_WEEKLY_THRESHOLD: number;
  STUDENT_LOAN_PLAN_2_WEEKLY_THRESHOLD: number;
  STUDENT_LOAN_PLAN_4_WEEKLY_THRESHOLD: number;
  STUDENT_LOAN_PLAN_5_WEEKLY_THRESHOLD: number;
  STUDENT_LOAN_POSTGRAD_WEEKLY_THRESHOLD: number;
  STUDENT_LOAN_REPAYMENT_AMOUNT: number;
  STUDENT_LOAN_REPAYMENT_AMOUNT_POSTGRAD: number;

  // National Insurance
  // See https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2022-to-2023 for current and previous rates
  NI_MIDDLE_RATE: number;
  NI_UPPER_RATE: number;
  NI_MIDDLE_BRACKET: number;
  NI_UPPER_BRACKET: number;
}

const taxRates: Record<TaxYear, TaxRates> = {
  // As of 6th July 2022 (NICs change applied)
  // Change described here: https://www.gov.uk/guidance/estimate-how-the-national-insurance-contributions-changes-will-affect-you
  "2022/23": {
    // Income tax
    DEFAULT_PERSONAL_ALLOWANCE: 12_570,
    HIGHER_BRACKET: 50_270,
    ADDITIONAL_BRACKET: 150_000,
    BASIC_RATE: 0.2,
    HIGHER_RATE: 0.4,
    ADDITIONAL_RATE: 0.45,
    PERSONAL_ALLOWANCE_DROPOFF: 100_000,
    // Student loan repayments
    STUDENT_LOAN_PLAN_1_WEEKLY_THRESHOLD: 388,
    STUDENT_LOAN_PLAN_2_WEEKLY_THRESHOLD: 524,
    STUDENT_LOAN_PLAN_4_WEEKLY_THRESHOLD: 487.98,
    STUDENT_LOAN_PLAN_5_WEEKLY_THRESHOLD: 480, // Note: this was only introduced in 2023/24, so technically isn't relevant to 22/23
    STUDENT_LOAN_POSTGRAD_WEEKLY_THRESHOLD: 403.84,
    STUDENT_LOAN_REPAYMENT_AMOUNT: 0.09, // People on plans 1 or 2 repay 9% of the amount you earn over the threshold
    STUDENT_LOAN_REPAYMENT_AMOUNT_POSTGRAD: 0.06, // People on postgrad plans repay 6% of the amount you earn over the threshold
    // National Insurance
    NI_MIDDLE_RATE: 0.1325,
    NI_UPPER_RATE: 0.0325,
    NI_MIDDLE_BRACKET: 242,
    NI_UPPER_BRACKET: 967,
  },
  // As of 6th April 2023
  "2023/24": {
    // Income tax
    DEFAULT_PERSONAL_ALLOWANCE: 12_570,
    HIGHER_BRACKET: 50_270,
    ADDITIONAL_BRACKET: 124_140,
    BASIC_RATE: 0.2,
    HIGHER_RATE: 0.4,
    ADDITIONAL_RATE: 0.45,
    PERSONAL_ALLOWANCE_DROPOFF: 100_000,
    // Student loan repayments
    STUDENT_LOAN_PLAN_1_WEEKLY_THRESHOLD: 423,
    STUDENT_LOAN_PLAN_2_WEEKLY_THRESHOLD: 524,
    STUDENT_LOAN_PLAN_4_WEEKLY_THRESHOLD: 532,
    STUDENT_LOAN_PLAN_5_WEEKLY_THRESHOLD: 480,
    STUDENT_LOAN_POSTGRAD_WEEKLY_THRESHOLD: 403,
    STUDENT_LOAN_REPAYMENT_AMOUNT: 0.09, // People on plans 1, 2, 4 + 5 repay 9% of the amount you earn over the threshold
    STUDENT_LOAN_REPAYMENT_AMOUNT_POSTGRAD: 0.06, // People on postgrad plans repay 6% of the amount you earn over the threshold
    // National Insurance
    NI_MIDDLE_RATE: 0.1, // Changed from 12% to 10% on 6th Jan 2024 (out of normal cycle)
    NI_UPPER_RATE: 0.02,
    NI_MIDDLE_BRACKET: 242,
    NI_UPPER_BRACKET: 967,
  },
};

export const getHmrcRates = (taxYear?: TaxYear) => {
  if (!taxYear) {
    return taxRates["2023/24"];
  }

  return taxRates[taxYear];
};
