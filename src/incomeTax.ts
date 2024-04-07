import { getHmrcRates, isScottishTaxRates } from "./hmrc";

import type {
  IncomeTax,
  TaxYear,
  Country,
  EnglishTaxRates,
  ScottishTaxRates,
} from "./types";

function calculateEnglishTaxes({
  taxRates,
  taxYear,
  taxableAnnualIncome,
  personalAllowance,
}: {
  taxRates: EnglishTaxRates;
  taxYear?: TaxYear;
  taxableAnnualIncome: number;
  personalAllowance: number;
}) {
  const { BASIC_RATE, ADDITIONAL_BRACKET, HIGHER_RATE, ADDITIONAL_RATE } =
    taxRates;
  const adjustedTaxableIncome = taxableAnnualIncome - personalAllowance;
  const adjustedHigherBracket = HIGHER_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;

  // 3 rates of tax
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
      adjustedTaxableIncome > ADDITIONAL_BRACKET
        ? adjustedTaxableIncome - ADDITIONAL_BRACKET
        : 0;
    const higherAmount =
      adjustedTaxableIncome - adjustedHigherBracket - amountOverToDiscard;
    higherRateTax = higherAmount * HIGHER_RATE;
  }

  if (adjustedTaxableIncome > ADDITIONAL_BRACKET) {
    const additionalAmount = adjustedTaxableIncome - ADDITIONAL_BRACKET;
    additionalRateTax = additionalAmount * ADDITIONAL_RATE;
  }

  // Income is lower than the personal allowance - no income tax
  return {
    total: basicRateTax + higherRateTax + additionalRateTax,
    breakdown: {
      basicRateTax,
      higherRateTax,
      additionalRateTax,
    },
  };
}

function calculateScottishTaxes({
  taxRates,
  taxYear,
  taxableAnnualIncome,
  personalAllowance,
}: {
  taxRates: ScottishTaxRates;
  taxYear?: TaxYear;
  taxableAnnualIncome: number;
  personalAllowance: number;
}) {
  const adjustedTaxableIncome = taxableAnnualIncome - personalAllowance;
  const adjustedHigherBracket = HIGHER_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;

  // 6 rates of tax in Scotland
  let starterRateTax = 0;
  let basicRateTax = 0;
  let intermediateRateTax = 0;
  let higherRateTax = 0;
  let advancedRateTax = 0;
  let topRateTax = 0;

  // TODO implement the calculations for Scottish taxes here

  return {
    total: 0,
    breakdown: {
      starterRateTax,
      basicRateTax,
      intermediateRateTax,
      higherRateTax,
      advancedRateTax,
      topRateTax,
    },
  };
}

// Calculates an indivudals income tax against annual taxable income
// Note: National Insurance contributions are not included here, see `calculateEmployeeNationalInsurance` instead
export const calculateIncomeTax = ({
  taxYear,
  country,
  taxableAnnualIncome,
  personalAllowance,
}: {
  taxYear?: TaxYear;
  country?: Country;
  taxableAnnualIncome: number; // Pre-tax income (before any taxes or NI contributions)
  personalAllowance: number; // The individual's personal allowance
}): IncomeTax => {
  const taxRates = getHmrcRates({ taxYear, country });

  if (isScottishTaxRates(taxRates)) {
    return calculateScottishTaxes({
      taxRates,
      taxYear,
      taxableAnnualIncome,
      personalAllowance,
    });
  } else {
    return calculateEnglishTaxes({
      taxRates,
      taxYear,
      taxableAnnualIncome,
      personalAllowance,
    });
  }
};
