// Internal helper (not re-exported from index.ts).
//
// Applies the personal allowance taper: the allowance is reduced by £1 for every £2 of income
// over the taper threshold (£100,000), and a result that isn't a whole number of pounds is
// rounded up to the next £1 (Income Tax Act 2007 s.35(3)), e.g. £100,001 keeps £12,570.
// See https://www.legislation.gov.uk/ukpga/2007/3/section/35
export const taperPersonalAllowance = ({
  defaultPersonalAllowance,
  taperThreshold,
  income,
}: {
  defaultPersonalAllowance: number;
  taperThreshold: number;
  income: number;
}): number => {
  const reduction = income > taperThreshold ? (income - taperThreshold) / 2 : 0;
  const allowance = defaultPersonalAllowance - reduction;

  if (allowance <= 0) {
    return 0;
  }

  // The small tolerance stops float noise in the input (e.g. 102,413.99999999999 from
  // salary − pension arithmetic) pushing a whole-pound allowance up to the next pound.
  return Math.ceil(allowance - 1e-7);
};
