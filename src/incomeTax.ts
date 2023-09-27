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
  const afterPersonalAllowance =
    taxableAnnualIncome - personalAllowance > 0
      ? taxableAnnualIncome - personalAllowance
      : 0;

  // Income over £100k: the brackets need to move in accordance with personal allowance changes
  const personalAllowanceDeduction =
    DEFAULT_PERSONAL_ALLOWANCE - personalAllowance;
  const higherBracket = HIGHER_BRACKET - personalAllowanceDeduction;
  const additionalBracket = ADDITIONAL_BRACKET - personalAllowanceDeduction;

  // Additional Rate taxpayers
  if (taxableAnnualIncome > additionalBracket) {
    // 3 rates apply (basic, higher, additional)
    const additionalSection = taxableAnnualIncome - additionalBracket;
    const higherSection =
      taxableAnnualIncome - higherBracket - additionalSection;
    const basicSection = HIGHER_BRACKET - personalAllowance;
    const basicRateTax = basicSection * BASIC_RATE;
    const higherRateTax = higherSection * HIGHER_RATE;
    const additionalRateTax = additionalSection * ADDITIONAL_RATE;

    return {
      basicRateTax,
      higherRateTax,
      additionalRateTax,
    };
  }

  // Higher Rate taxpayers
  if (
    taxableAnnualIncome <= additionalBracket &&
    taxableAnnualIncome > higherBracket
  ) {
    // 2 bands apply (basic, higher)
    const higherSection = taxableAnnualIncome - higherBracket;
    // const basicSection =
    //   taxableAnnualIncome - personalAllowance - higherSection;
    const basicSection = HIGHER_BRACKET - personalAllowance;
    const basicRateTax = basicSection * BASIC_RATE;
    const higherRateTax = higherSection * HIGHER_RATE;

    return {
      basicRateTax,
      higherRateTax,
      additionalRateTax: 0,
    };
  }

  // Basic Rate taxpayers
  if (
    taxableAnnualIncome <= higherBracket &&
    taxableAnnualIncome > personalAllowance
  ) {
    // 1 band applies (basic)
    const basicRateTax = afterPersonalAllowance * BASIC_RATE;

    return {
      basicRateTax,
      higherRateTax: 0,
      additionalRateTax: 0,
    };
  }

  throw new Error("Unexpected Input");
};
