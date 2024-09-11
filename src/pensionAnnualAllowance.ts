import { getHmrcRates } from "./hmrc";

import type { TaxYear } from "./types";

interface Args {
  taxYear?: TaxYear;
  totalAnnualIncome: number;
  retrospectivePensionPaymentsTaxRelief?: number;
  employeeDcPensionContributions?: number;
  employerDcPensionContributions?: number;
  lumpSumDeathBenefits?: number;
}

// Calculates an individual's annual pension contributions allowance
// UNSUPPORTED: DB Pensions
// UNSUPPORTED: Carry forward allowances from previous years
// UNSUPPORTED: Paying into overseas pension schemes
// Tips:
// Use `retrospectivePensionPaymentsTaxRelief` for personal contributions (or any other form of relief at source contribution)
// Use `employeeDcPensionContributions` for post-2015 Salary Sacrifice schemes
// Use `retrospectivePensionPaymentsTaxRelief` for pre-2015 Salary Sacrifice schemes
export const calculatePensionAnnualAllowance = ({
  taxYear,
  totalAnnualIncome,
  retrospectivePensionPaymentsTaxRelief,
  employeeDcPensionContributions,
  employerDcPensionContributions,
  lumpSumDeathBenefits,
}: Args) => {
  const {
    PENSION_ANNUAL_ALLOWANCE, // 60k
    PENSION_MINIMUM_ANNUAL_ALLOWANCE, // 10k
    PENSION_ADJUSTED_LIMIT, // 260k
  } = getHmrcRates({ taxYear });

  const pensionSavings =
    (employeeDcPensionContributions ?? 0) +
    (employerDcPensionContributions ?? 0) +
    (retrospectivePensionPaymentsTaxRelief ?? 0);

  const adjustedIncome =
    totalAnnualIncome +
    pensionSavings -
    (retrospectivePensionPaymentsTaxRelief ?? 0) -
    (lumpSumDeathBenefits ?? 0);

  const thresholdIncome =
    totalAnnualIncome +
    (employeeDcPensionContributions ?? 0) -
    (retrospectivePensionPaymentsTaxRelief ?? 0) -
    (lumpSumDeathBenefits ?? 0);

  const amountOver = adjustedIncome - PENSION_ADJUSTED_LIMIT;

  // Reduction is £1 per £2 over the limit
  // Also, reductions are rounded down to the nearest £1
  const reduction = amountOver > 0 ? Math.floor(amountOver / 2) : 0;

  let newAllowance = PENSION_ANNUAL_ALLOWANCE;

  if (reduction > 0) {
    const updated = PENSION_ANNUAL_ALLOWANCE - reduction;
    newAllowance =
      updated < PENSION_MINIMUM_ANNUAL_ALLOWANCE
        ? PENSION_MINIMUM_ANNUAL_ALLOWANCE
        : updated;
  }

  return {
    adjustedIncome,
    thresholdIncome,
    reduction,
    allowance: newAllowance,
  };
};
