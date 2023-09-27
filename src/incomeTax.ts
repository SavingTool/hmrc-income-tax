import type { IncomeTax, TaxYear } from "./types";
import { getHmrcRates } from "./hmrc";

// Calculates an indivudals income tax against annual taxable income
// Note: National Insurance contributions are not included here, see `calculateEmployeeNationalInsurance` instead
export const calculateIncomeTax = ({
  taxYear,
  taxableAnnualIncome,
  personalAllowance,
}: {
  taxYear?: TaxYear;
  taxableAnnualIncome: number; // Pre-tax income (before any taxes or NI contributions)
  personalAllowance: number; // The individual's personal allowance
}): IncomeTax => {
  const {
    ADDITIONAL_BRACKET,
    ADDITIONAL_RATE,
    BASIC_RATE,
    DEFAULT_PERSONAL_ALLOWANCE,
    HIGHER_BRACKET,
    HIGHER_RATE,
  } = getHmrcRates(taxYear);

  // Income over £100k: the brackets need to move in accordance with personal allowance changes
  const personalAllowanceDeduction =
    DEFAULT_PERSONAL_ALLOWANCE - personalAllowance;
  const higherBracket = HIGHER_BRACKET - personalAllowanceDeduction;
  const additionalBracket = ADDITIONAL_BRACKET - personalAllowanceDeduction;

  // Taxable income between 0/PA and the higher bracket
  const basicSection = HIGHER_BRACKET - personalAllowance;

  // Additional Rate taxpayers (3 bands)
  if (taxableAnnualIncome > additionalBracket) {
    // Taxable income between the higher bracket and additional bracket
    const higherSection = ADDITIONAL_BRACKET - HIGHER_BRACKET;
    // Taxable income over the additional bracket
    const additionalSection = taxableAnnualIncome - ADDITIONAL_BRACKET;

    // Calculate amounts against sections
    const basicRateTax = basicSection * BASIC_RATE;
    const higherRateTax = higherSection * HIGHER_RATE;
    const additionalRateTax = additionalSection * ADDITIONAL_RATE;

    return {
      basicRateTax,
      higherRateTax,
      additionalRateTax,
    };
  }

  // Higher Rate taxpayers (2 bands)
  if (
    taxableAnnualIncome <= additionalBracket &&
    taxableAnnualIncome > higherBracket
  ) {
    // Taxable income between the higher bracket and additional bracket
    const higherSection = taxableAnnualIncome - HIGHER_BRACKET;
    const basicRateTax = basicSection * BASIC_RATE;
    const higherRateTax = higherSection * HIGHER_RATE;

    return {
      basicRateTax,
      higherRateTax,
      additionalRateTax: 0,
    };
  }

  // Basic Rate taxpayers (1 band)
  if (
    taxableAnnualIncome <= higherBracket &&
    taxableAnnualIncome > personalAllowance
  ) {
    // 1 band applies (basic)
    const afterPersonalAllowance =
      taxableAnnualIncome - personalAllowance > 0
        ? taxableAnnualIncome - personalAllowance
        : 0;
    const basicRateTax = afterPersonalAllowance * BASIC_RATE;

    return {
      basicRateTax,
      higherRateTax: 0,
      additionalRateTax: 0,
    };
  }

  throw new Error("Unexpected Input");
};
