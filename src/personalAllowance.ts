import { getHmrcRates } from "./hmrc";

import type { TaxYear, Country } from "./types";

// Calculates an individual's annual personal allowance, based on taxable annual income.
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

  // £1 of personal allowance is reduced for every £2 of Income over £100,000
  let personalAllowanceDeduction =
    taxableAnnualIncome >= PERSONAL_ALLOWANCE_DROPOFF
      ? (taxableAnnualIncome - PERSONAL_ALLOWANCE_DROPOFF) / 2
      : 0;

  // When beyond £125k taxable income, the personal allowance will reach zero.
  // Don't let the deduction go below zero, though.
  if (personalAllowanceDeduction < 0) {
    personalAllowanceDeduction = 0;
  }

  const sum = DEFAULT_PERSONAL_ALLOWANCE - personalAllowanceDeduction;

  if (sum <= 0) {
    return 0;
  }

  // A tapered allowance that isn't a whole number of pounds is rounded up to the next £1
  // (Income Tax Act 2007 s.35(3)), e.g. £100,001 of income keeps £12,570, not £12,569.50.
  // See https://www.legislation.gov.uk/ukpga/2007/3/section/35
  // The small tolerance stops float noise in the input (e.g. 102,413.99999999999 from
  // salary − pension arithmetic) pushing a whole-pound allowance up to the next pound.
  return Math.ceil(sum - 1e-7);
};
