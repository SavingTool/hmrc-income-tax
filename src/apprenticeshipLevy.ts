import { getHmrcRates } from "./hmrc";

import type { TaxYear } from "./types";

// Calculates the Apprenticeship Levy payable on an employer's annual pay bill.
// The levy is 0.5% of the pay bill above the annual allowance (£15,000).
// Only employers with a pay bill over £3,000,000 will have a levy to pay after the allowance.
// See https://www.gov.uk/guidance/pay-apprenticeship-levy
export const calculateApprenticeshipLevy = ({
  taxYear,
  annualPayBill,
}: {
  taxYear?: TaxYear;
  annualPayBill: number;
}) => {
  const { APPRENTICESHIP_LEVY_RATE, APPRENTICESHIP_LEVY_ALLOWANCE } = getHmrcRates({ taxYear });

  return Math.max(0, annualPayBill * APPRENTICESHIP_LEVY_RATE - APPRENTICESHIP_LEVY_ALLOWANCE);
};
