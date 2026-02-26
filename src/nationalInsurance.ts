import { getHmrcRates } from "./hmrc";

import type { TaxYear, Country } from "./types";

// Calculates an individual's national insurance contributions based on gross employment income.
// Pass gross PAYE employment income — NI is not reduced by non-salary-sacrifice pension contributions.
// Supports class 1, category A employee national insurance only.
// Uses the employee's weekly salary as a basis, as per the system, then re-converts into a year at the end.
// See https://www.gov.uk/national-insurance-rates-letters/category-letters for other categories
export const calculateEmployeeNationalInsurance = ({
  taxYear,
  country,
  grossAnnualIncome,
}: {
  taxYear?: TaxYear;
  country?: Country;
  grossAnnualIncome: number;
}) => {
  const weeklySalary = grossAnnualIncome / 52;
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

  return (middleBracket + upperBracket) * 52;
};

// Calculates employer national insurance contributions based on an employee's gross employment income.
// Pass gross PAYE employment income — NI is not reduced by non-salary-sacrifice pension contributions.
// Supports class 1, category A secondary contributions only.
// Uses the employee's weekly salary as a basis, as per the system, then re-converts into a year at the end.
// See https://www.gov.uk/national-insurance-rates-letters/category-letters for other categories
export const calculateEmployerNationalInsurance = ({
  taxYear,
  country,
  grossAnnualIncome,
}: {
  taxYear?: TaxYear;
  country?: Country;
  grossAnnualIncome: number;
}) => {
  const weeklySalary = grossAnnualIncome / 52;
  const { EMPLOYER_NI_RATE, EMPLOYER_NI_SECONDARY_THRESHOLD } = getHmrcRates({
    taxYear,
    country,
  });

  if (weeklySalary <= EMPLOYER_NI_SECONDARY_THRESHOLD) {
    return 0;
  }

  return (
    (weeklySalary - EMPLOYER_NI_SECONDARY_THRESHOLD) * EMPLOYER_NI_RATE * 52
  );
};
