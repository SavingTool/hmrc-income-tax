import { getHmrcRates } from "./hmrc";

import type { TaxYear } from "./types";

// Calculates corporation tax for a company's taxable profits.
// For 2023/24 onwards, applies marginal relief for profits between the small profits threshold
// and the main rate threshold. For earlier years (e.g. 2022/23), a flat rate applies.
// Note: This calculation assumes a single company with no associated companies.
// For associated companies, divide the thresholds by the total number of associated companies.
// See https://www.gov.uk/corporation-tax-rates
export const calculateCorporationTax = ({
  taxYear,
  profits,
}: {
  taxYear?: TaxYear;
  profits: number;
}) => {
  const {
    CORPORATION_TAX_MAIN_RATE,
    CORPORATION_TAX_SMALL_PROFITS_RATE,
    CORPORATION_TAX_SMALL_PROFITS_THRESHOLD,
    CORPORATION_TAX_MAIN_RATE_THRESHOLD,
  } = getHmrcRates({ taxYear });

  if (profits <= 0) return 0;

  // Flat rate year (e.g. 2022/23 where both rates are equal)
  if (CORPORATION_TAX_SMALL_PROFITS_RATE === CORPORATION_TAX_MAIN_RATE) {
    return profits * CORPORATION_TAX_MAIN_RATE;
  }

  if (profits <= CORPORATION_TAX_SMALL_PROFITS_THRESHOLD) {
    return profits * CORPORATION_TAX_SMALL_PROFITS_RATE;
  }

  if (profits >= CORPORATION_TAX_MAIN_RATE_THRESHOLD) {
    return profits * CORPORATION_TAX_MAIN_RATE;
  }

  // Marginal relief applies for profits between the two thresholds.
  // Standard fraction = lower_threshold × (main_rate - small_profits_rate) / (upper_threshold - lower_threshold)
  // Tax = profits × main_rate - standard_fraction × (upper_threshold - profits)
  const standardFraction =
    (CORPORATION_TAX_SMALL_PROFITS_THRESHOLD *
      (CORPORATION_TAX_MAIN_RATE - CORPORATION_TAX_SMALL_PROFITS_RATE)) /
    (CORPORATION_TAX_MAIN_RATE_THRESHOLD -
      CORPORATION_TAX_SMALL_PROFITS_THRESHOLD);

  const marginalRelief =
    standardFraction * (CORPORATION_TAX_MAIN_RATE_THRESHOLD - profits);

  return profits * CORPORATION_TAX_MAIN_RATE - marginalRelief;
};
