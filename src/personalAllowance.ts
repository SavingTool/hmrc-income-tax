import { getHmrcRates } from "./hmrc";

import type { TaxYear, Country } from "./types";

const ROUNDING_EPSILON = 1e-7;

// Calculates an individual's annual personal allowance, based on taxable annual income.
// The tapered allowance is a whole number of pounds (rounded up, Income Tax Act 2007 s.35(3)).
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

  // An allowance that is not a whole number of pounds after the reduction is rounded up to the
  // next pound: Income Tax Act 2007 s.35(3), "If the amount of any allowance that remains after
  // the operation of subsection (2) would otherwise not be a multiple of £1, it is to be rounded
  // up to the nearest amount which is a multiple of £1."
  // https://www.legislation.gov.uk/ukpga/2007/3/section/35
  // So an income of £100,001 keeps £12,570, not £12,569.50.
  // The epsilon absorbs binary float noise in the income passed in (e.g. a salary less a pension
  // that comes out as 102,413.99999999999), which would otherwise lift a whole-pound allowance to
  // the next pound. For an income in pence a real part-pound is at least 0.005 above the pound.
  return Math.max(0, Math.ceil(sum - ROUNDING_EPSILON));
};
