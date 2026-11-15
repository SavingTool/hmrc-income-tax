import { getHmrcRates } from "./hmrc";
import { taperPersonalAllowance } from "./allowanceTaper";

import type { TaxYear, Country } from "./types";

// Calculates an individual's annual personal allowance, based on taxable annual income.
// Above £100,000 the allowance is reduced by £1 for every £2 of income, and rounded up to a
// whole pound (Income Tax Act 2007 s.35(3)). It reaches zero at £125,140.
// Not yet supported: marriage allowance, blind person's allowance
export const calculatePersonalAllowance = ({
  taxYear,
  country,
  taxableAnnualIncome,
}: {
  taxYear?: TaxYear;
  country?: Country;
  taxableAnnualIncome: number;
}): number => {
  const { PERSONAL_ALLOWANCE_DROPOFF, DEFAULT_PERSONAL_ALLOWANCE } =
    getHmrcRates({ taxYear, country });

  return taperPersonalAllowance({
    defaultPersonalAllowance: DEFAULT_PERSONAL_ALLOWANCE,
    taperThreshold: PERSONAL_ALLOWANCE_DROPOFF,
    income: taxableAnnualIncome,
  });
};
