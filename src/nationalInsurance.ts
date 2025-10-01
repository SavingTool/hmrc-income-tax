import { getHmrcRates } from "./hmrc";
import { roundToPence } from "./utils";

import type { TaxYear, Country } from "./types";

// Calculates an individual's national insurance contributions based on taxable income
// Note: This is employee contributions only. Supports class 1, category A national insurance only.
// Uses the employee's weekly salary as a basis, as per the system, then re-converts into a year at the end.
// See https://www.gov.uk/national-insurance-rates-letters/category-letters for other categories
export const calculateEmployeeNationalInsurance = ({
  taxYear,
  country,
  taxableAnnualIncome,
}: {
  taxYear?: TaxYear;
  country?: Country;
  taxableAnnualIncome: number;
}) => {
  const weeklySalary = taxableAnnualIncome / 52;
  const { NI_MIDDLE_RATE, NI_UPPER_RATE, NI_MIDDLE_BRACKET, NI_UPPER_BRACKET } =
    getHmrcRates({ taxYear, country });
  const afterFreeSection = weeklySalary - NI_MIDDLE_BRACKET;
  let middleBracket = 0;
  let upperBracket = 0;

  if (weeklySalary > NI_UPPER_BRACKET) {
    // 2 bands apply
    const upperSection = weeklySalary - NI_UPPER_BRACKET;
    const middleSection = weeklySalary - NI_MIDDLE_BRACKET - upperSection;
    upperBracket = upperSection * NI_UPPER_RATE;
    middleBracket = middleSection * NI_MIDDLE_RATE;
  }

  if (weeklySalary < NI_UPPER_BRACKET && weeklySalary > NI_MIDDLE_BRACKET) {
    middleBracket = afterFreeSection * NI_MIDDLE_RATE;
  }

  return roundToPence((middleBracket + upperBracket) * 52);
};
