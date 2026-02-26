import { getHmrcRates } from "./hmrc";
import { calculatePersonalAllowance } from "./personalAllowance";

import type { TaxYear, EnglishTaxRates, DividendTax } from "./types";

// Calculates dividend tax on dividend income, stacked on top of other income.
//
// Dividend tax rates and band thresholds are UK-wide — they apply equally to Scottish taxpayers,
// who use their own income tax rates only for non-savings, non-dividend income. As a result,
// this function does not accept a `country` parameter.
//
// The personal allowance is applied to non-dividend income first. Any unused allowance then
// applies to dividend income. The dividend allowance (e.g. £500 for 2024/25+) is tax-free but
// still occupies band space, which affects the rate on dividends above it.
//
// See https://www.gov.uk/tax-on-dividends
export const calculateDividendTax = ({
  taxYear,
  nonDividendTaxableIncome,
  dividendIncome,
  personalAllowance: providedPersonalAllowance,
}: {
  taxYear?: TaxYear;
  nonDividendTaxableIncome: number;
  dividendIncome: number;
  personalAllowance?: number;
}): DividendTax => {
  // Dividend bands use UK (not Scottish) thresholds, so always use English rates.
  const rates = getHmrcRates({ taxYear }) as EnglishTaxRates;
  const {
    HIGHER_BRACKET,
    ADDITIONAL_BRACKET,
    DIVIDEND_ALLOWANCE,
    DIVIDEND_BASIC_RATE,
    DIVIDEND_HIGHER_RATE,
    DIVIDEND_ADDITIONAL_RATE,
  } = rates;

  const totalIncome = nonDividendTaxableIncome + dividendIncome;
  const pa =
    providedPersonalAllowance ??
    calculatePersonalAllowance({ taxYear, taxableAnnualIncome: totalIncome });

  // PA is applied to non-dividend income first; any remainder applies to dividends.
  const paForNonDividend = Math.min(pa, nonDividendTaxableIncome);
  const paRemainingForDividends = pa - paForNonDividend;
  const dividendAfterPA = Math.max(0, dividendIncome - paRemainingForDividends);

  // The dividend allowance reduces taxable dividends but still occupies band space.
  const dividendAllowanceUsed = Math.min(DIVIDEND_ALLOWANCE, dividendAfterPA);
  const taxableDividends = dividendAfterPA - dividendAllowanceUsed;

  let basicRateDividendTax = 0;
  let higherRateDividendTax = 0;
  let additionalRateDividendTax = 0;

  if (taxableDividends > 0) {
    // Band position (in total income terms) where taxable dividends begin:
    // after non-dividend income (or the PA boundary, whichever is higher) plus the dividend allowance.
    const bandPositionStart =
      Math.max(nonDividendTaxableIncome, pa) + dividendAllowanceUsed;
    let remaining = taxableDividends;
    let position = bandPositionStart;

    if (position < HIGHER_BRACKET) {
      const inBasicBand = Math.min(remaining, HIGHER_BRACKET - position);
      basicRateDividendTax = inBasicBand * DIVIDEND_BASIC_RATE;
      remaining -= inBasicBand;
      position += inBasicBand;
    }

    if (remaining > 0 && position < ADDITIONAL_BRACKET) {
      const inHigherBand = Math.min(remaining, ADDITIONAL_BRACKET - position);
      higherRateDividendTax = inHigherBand * DIVIDEND_HIGHER_RATE;
      remaining -= inHigherBand;
      position += inHigherBand;
    }

    if (remaining > 0) {
      additionalRateDividendTax = remaining * DIVIDEND_ADDITIONAL_RATE;
    }
  }

  return {
    total:
      basicRateDividendTax + higherRateDividendTax + additionalRateDividendTax,
    breakdown: {
      basicRateDividendTax,
      higherRateDividendTax,
      additionalRateDividendTax,
    },
  };
};
