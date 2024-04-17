import { getHmrcRates, isScottishTaxRates } from "./hmrc";

import type {
  EnglishIncomeTax,
  ScottishIncomeTax,
  TaxYear,
  SupportedEnglishTaxYear,
  SupportedScottishTaxYear,
  Country,
  EnglishTaxRates,
  ScottishTaxRates,
} from "./types";

function calculateEnglishTaxes({
  taxRates,
  taxableAnnualIncome,
  personalAllowance,
}: {
  taxRates: EnglishTaxRates;
  taxableAnnualIncome: number;
  personalAllowance: number;
}): EnglishIncomeTax {
  const {
    DEFAULT_PERSONAL_ALLOWANCE,
    BASIC_RATE,
    ADDITIONAL_BRACKET,
    HIGHER_RATE,
    HIGHER_BRACKET,
    ADDITIONAL_RATE,
  } = taxRates;
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
    incomeTaxType: "England/NI/Wales",
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
}): ScottishIncomeTax {
  const {
    DEFAULT_PERSONAL_ALLOWANCE,
    STARTER_RATE,
    BASIC_BRACKET,
    BASIC_RATE,
    INTERMEDIATE_BRACKET,
    INTERMEDIATE_RATE,
    HIGHER_BRACKET,
    HIGHER_RATE,
    ADVANCED_BRACKET,
    ADVANCED_RATE,
    TOP_BRACKET,
    TOP_RATE,
  } = taxRates;

  const adjustedTaxableIncome = taxableAnnualIncome - personalAllowance;

  const bracket1 = BASIC_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;
  const bracket2 = INTERMEDIATE_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;
  const bracket3 = HIGHER_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;
  const bracket4 = ADVANCED_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;
  const bracket5 = TOP_BRACKET - DEFAULT_PERSONAL_ALLOWANCE;

  // 6 rates of tax in Scotland
  let starterRateTax = 0;
  let basicRateTax = 0;
  let intermediateRateTax = 0;
  let higherRateTax = 0;
  let advancedRateTax = 0;
  let topRateTax = 0;

  // 1. Starter rate tax
  if (adjustedTaxableIncome > 0) {
    const starterAmount =
      adjustedTaxableIncome < bracket1 ? adjustedTaxableIncome : bracket1;
    starterRateTax = starterAmount * STARTER_RATE;
  }

  // 2. Basic rate tax
  if (adjustedTaxableIncome > bracket1) {
    const amountOverToDiscard =
      adjustedTaxableIncome > BASIC_BRACKET
        ? adjustedTaxableIncome - BASIC_BRACKET
        : 0;
    const amt = adjustedTaxableIncome - bracket1 - amountOverToDiscard;
    basicRateTax = amt * BASIC_RATE;
  }

  // 3. Intermediate rate tax
  if (adjustedTaxableIncome > bracket2) {
    const amountOverToDiscard =
      adjustedTaxableIncome > INTERMEDIATE_BRACKET
        ? adjustedTaxableIncome - INTERMEDIATE_BRACKET
        : 0;
    const amt = adjustedTaxableIncome - bracket2 - amountOverToDiscard;
    intermediateRateTax = amt * INTERMEDIATE_RATE;
  }

  // 4. Higher rate tax
  if (adjustedTaxableIncome > bracket3) {
    const amountOverToDiscard =
      adjustedTaxableIncome > HIGHER_BRACKET
        ? adjustedTaxableIncome - HIGHER_BRACKET
        : 0;
    const amt = adjustedTaxableIncome - bracket3 - amountOverToDiscard;
    higherRateTax = amt * HIGHER_RATE;
  }

  // 5. Advanced rate tax
  if (adjustedTaxableIncome > bracket4) {
    const amountOverToDiscard =
      adjustedTaxableIncome > ADVANCED_BRACKET
        ? adjustedTaxableIncome - ADVANCED_BRACKET
        : 0;
    const amt = adjustedTaxableIncome - bracket4 - amountOverToDiscard;
    advancedRateTax = amt * ADVANCED_RATE;
  }

  // 6. Top rate tax
  if (adjustedTaxableIncome > bracket5) {
    const amt = adjustedTaxableIncome - bracket5;
    topRateTax = amt * ADVANCED_RATE;
  }

  const total =
    starterRateTax +
    basicRateTax +
    intermediateRateTax +
    higherRateTax +
    advancedRateTax +
    topRateTax;

  return {
    total,
    incomeTaxType: "Scotland",
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
}): EnglishIncomeTax | ScottishIncomeTax => {
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
      taxableAnnualIncome,
      personalAllowance,
    });
  }
};
