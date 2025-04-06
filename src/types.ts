export interface EnglishIncomeTax {
  incomeTaxType: "England/NI/Wales";
  total: number;
  breakdown: {
    basicRateTax: number;
    higherRateTax: number;
    additionalRateTax: number;
  };
}

export interface ScottishIncomeTax {
  incomeTaxType: "Scotland";
  total: number;
  breakdown: {
    starterRateTax: number;
    basicRateTax: number;
    intermediateRateTax: number;
    higherRateTax: number;
    advancedRateTax: number;
    topRateTax: number;
  };
}

export type StudentLoanPlan = 1 | 2 | 4 | 5 | "postgrad";

export type SupportedEnglishTaxYear =
  | "2022/23"
  | "2023/24"
  | "2024/25"
  | "2025/26";

export type SupportedScottishTaxYear = "2024/25" | "2025/26";

export type TaxYear = SupportedEnglishTaxYear | SupportedScottishTaxYear;

// There are two sets of rates for income tax for the UK
export type Country = "England/NI/Wales" | "Scotland";

interface BasicTaxRates {
  COUNTRY: Country;

  // Income Tax
  // See https://www.gov.uk/income-tax-rates
  DEFAULT_PERSONAL_ALLOWANCE: number;
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

  // Pension allowances
  PENSION_ANNUAL_ALLOWANCE: number;
  PENSION_MINIMUM_ANNUAL_ALLOWANCE: number;
  PENSION_ADJUSTED_LIMIT: number;
}

export interface EnglishTaxRates extends BasicTaxRates {
  COUNTRY: "England/NI/Wales";

  // 1. Basic
  BASIC_RATE: number;

  // 2. Higher
  HIGHER_BRACKET: number;
  HIGHER_RATE: number;

  // 3. Additional
  ADDITIONAL_BRACKET: number;
  ADDITIONAL_RATE: number;
}

export interface ScottishTaxRates extends BasicTaxRates {
  COUNTRY: "Scotland";

  // 1. Starter
  STARTER_RATE: number;

  // 2. Basic
  BASIC_BRACKET: number;
  BASIC_RATE: number;

  // 3. Intermediate
  INTERMEDIATE_BRACKET: number;
  INTERMEDIATE_RATE: number;

  // 4. Higher
  HIGHER_BRACKET: number;
  HIGHER_RATE: number;

  // 5. Advanced
  ADVANCED_BRACKET: number;
  ADVANCED_RATE: number;

  // 6. Top
  TOP_BRACKET: number;
  TOP_RATE: number;
}
