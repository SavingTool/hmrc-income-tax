import type { TaxYear } from "./types";
import { getHmrcRates } from "./hmrc";

// Calculates an individual's annual personal allowance, based on taxable annual income.
// Not yet supported: marriage allowance, blind person's allowance
export const calculatePersonalAllowance = ({
  taxYear,
  taxableAnnualIncome,
}: {
  taxYear?: TaxYear;
  taxableAnnualIncome: number;
}): number => {
  const { PERSONAL_ALLOWANCE_DROPOFF, DEFAULT_PERSONAL_ALLOWANCE } =
    getHmrcRates(taxYear);

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

  return sum < 0 ? 0 : sum;
};
