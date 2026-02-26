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

export interface DividendTax {
  total: number;
  breakdown: {
    basicRateDividendTax: number;
    higherRateDividendTax: number;
    additionalRateDividendTax: number;
  };
}

export interface CumulativePayeOptions {
  monthNumber: number; // 1-12, which month of the tax year
  cumulativeGrossIncome: number; // Total gross income to date in the tax year
  cumulativeTaxPaid: number; // Total tax already paid to date in the tax year
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

  // Employee National Insurance
  // See https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2022-to-2023 for current and previous rates
  NI_MIDDLE_RATE: number;
  NI_UPPER_RATE: number;
  NI_MIDDLE_BRACKET: number;
  NI_UPPER_BRACKET: number;

  // Employer National Insurance (Class 1, Category A secondary contributions)
  // See https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026
  EMPLOYER_NI_RATE: number;
  EMPLOYER_NI_SECONDARY_THRESHOLD: number; // Weekly secondary threshold

  // Dividend tax
  // See https://www.gov.uk/tax-on-dividends
  DIVIDEND_ALLOWANCE: number;
  DIVIDEND_BASIC_RATE: number;
  DIVIDEND_HIGHER_RATE: number;
  DIVIDEND_ADDITIONAL_RATE: number;

  // VAT
  // See https://www.gov.uk/vat-registration/overview
  VAT_STANDARD_RATE: number;
  VAT_REDUCED_RATE: number;
  VAT_REGISTRATION_THRESHOLD: number;

  // Apprenticeship Levy
  // See https://www.gov.uk/guidance/pay-apprenticeship-levy
  APPRENTICESHIP_LEVY_RATE: number;
  APPRENTICESHIP_LEVY_ALLOWANCE: number;

  // Corporation Tax
  // See https://www.gov.uk/corporation-tax-rates
  CORPORATION_TAX_MAIN_RATE: number;
  CORPORATION_TAX_SMALL_PROFITS_RATE: number;
  CORPORATION_TAX_SMALL_PROFITS_THRESHOLD: number;
  CORPORATION_TAX_MAIN_RATE_THRESHOLD: number;

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
