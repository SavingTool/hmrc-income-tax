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

  const adjustedTaxableIncome = taxableAnnualIncome - personalAllowance;
  const adjustedHigherBracket = HIGHER_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;
  const adjustedAdditionalBracket =
    ADDITIONAL_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;

  let basicRateTax = 0;
  let higherRateTax = 0;
  let additionalRateTax = 0;

  if (adjustedTaxableIncome > 0) {
    const basicAmount =
      adjustedTaxableIncome < adjustedHigherBracket
        ? adjustedTaxableIncome
        : adjustedHigherBracket;
    basicRateTax = basicAmount * BASIC_RATE;
  }

  if (adjustedTaxableIncome > adjustedHigherBracket) {
    const amountOverToDiscard =
      adjustedTaxableIncome > adjustedAdditionalBracket
        ? adjustedTaxableIncome - adjustedAdditionalBracket
        : 0;
    const higherAmount =
      adjustedTaxableIncome - adjustedHigherBracket - amountOverToDiscard;
    higherRateTax = higherAmount * HIGHER_RATE;
  }

  if (adjustedTaxableIncome > adjustedAdditionalBracket) {
    const additionalAmount = adjustedTaxableIncome - adjustedAdditionalBracket;
    additionalRateTax = additionalAmount * ADDITIONAL_RATE;
  }

  // Income is lower than the personal allowance - no income tax
  return {
    basicRateTax,
    higherRateTax,
    additionalRateTax,
  };
};
