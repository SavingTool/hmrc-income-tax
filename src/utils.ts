/**
 * Rounds a monetary amount to pence (2 decimal places) following HMRC conventions.
 * HMRC officially uses 1p precision, disregarding amounts under £0.005.
 * This implements standard rounding where amounts ≥ 0.005 round up.
 *
 * @param amount - The amount to round
 * @returns The amount rounded to 2 decimal places
 *
 * @see https://www.gov.uk/government/publications/cwg2-further-guide-to-paye-and-national-insurance-contributions/2023-to-2024-employer-further-guide-to-paye-and-national-insurance-contributions#sec1
 */
export const roundToPence = (amount: number): number => {
  return Math.round(amount * 100) / 100;
};
