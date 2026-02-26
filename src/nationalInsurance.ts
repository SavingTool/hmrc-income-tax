import { getHmrcRates } from "./hmrc";

import type { TaxYear, Country, NICategory, SupportedEnglishTaxYear } from "./types";

// ─── Self-contained expanded NI rates ─────────────────────────────────────────
// Rates that aren't already stored in hmrc.ts (which holds Class 1 Cat A data).
// NI rates are UK-wide, so one table covers all countries.

type ExpandedNIRates = {
  // Class 1 — Category B employee middle rate (married women/widows reduced rate election)
  catBMiddleRate: number;

  // Class 1 — Employer upper secondary thresholds (weekly £).
  // Employer pays 0% up to this threshold, then standard rate above.
  // See https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026
  freeportUpperSecondaryThreshold: number; // Freeport categories F, I, L, S
  investmentZoneUpperSecondaryThreshold: number; // Investment Zone categories N, E, D, K

  // Class 2 (self-employed)
  // See https://www.gov.uk/self-employed-national-insurance-rates
  class2WeeklyRate: number;
  class2SmallProfitsThreshold: number; // annual

  // Class 3 (voluntary)
  // See https://www.gov.uk/voluntary-national-insurance-contributions
  class3WeeklyRate: number;

  // Class 4 (self-employed profits)
  // See https://www.gov.uk/self-employed-national-insurance-rates
  class4MainRate: number;
  class4AdditionalRate: number;
  class4LowerProfitsLimit: number; // annual
  class4UpperProfitsLimit: number; // annual
};

const niRatesByYear: Record<SupportedEnglishTaxYear, ExpandedNIRates> = {
  // 2022/23: Health and Social Care Levy added 1.25 pp Apr–Nov 2022, then reversed.
  // Cat B rate uses the post-November 2022 value (5.85%), consistent with Cat A using its
  // post-July 2022 rate. Class 4 rates are HMRC's published blended annualised values.
  "2022/23": {
    catBMiddleRate: 0.0585,
    freeportUpperSecondaryThreshold: 481, // £25,000/year
    investmentZoneUpperSecondaryThreshold: 481, // Investment Zones introduced April 2023;
    // for 2022/23 IZ categories behave as standard (threshold falls back to secondary threshold)
    class2WeeklyRate: 3.15,
    class2SmallProfitsThreshold: 6_725,
    class3WeeklyRate: 15.85,
    class4MainRate: 0.0973, // Blended: 10.25% Apr–Nov, 9% Nov–Apr
    class4AdditionalRate: 0.0273, // Blended: 3.25% Apr–Nov, 2% Nov–Apr
    class4LowerProfitsLimit: 11_908,
    class4UpperProfitsLimit: 50_270,
  },
  // 2023/24: Cat B and Class 4 main rates changed from 6 Jan 2024 (out of normal cycle).
  // Cat B: 5.85% → 3.85%. Class 4 main: 9% → 8%.
  // Library uses the pre-change rates here (5.85%/9%) since Class 4 is assessed annually
  // and HMRC's own publications quote these as the 2023/24 rates.
  "2023/24": {
    catBMiddleRate: 0.0385, // Changed from 5.85% to 3.85% on 6 Jan 2024
    freeportUpperSecondaryThreshold: 481, // £25,000/year
    investmentZoneUpperSecondaryThreshold: 481, // £25,000/year (introduced April 2023)
    class2WeeklyRate: 3.45,
    class2SmallProfitsThreshold: 6_725,
    class3WeeklyRate: 17.45,
    class4MainRate: 0.09, // Changed from 9% to 8% on 6 Jan 2024
    class4AdditionalRate: 0.02,
    class4LowerProfitsLimit: 12_570,
    class4UpperProfitsLimit: 50_270,
  },
  "2024/25": {
    catBMiddleRate: 0.0185,
    freeportUpperSecondaryThreshold: 481, // £25,000/year
    investmentZoneUpperSecondaryThreshold: 481, // £25,000/year
    // From April 2024, Class 2 is treated as paid (no actual payment due) for those above
    // the small profits threshold. class2WeeklyRate is retained for reference only.
    class2WeeklyRate: 3.45,
    class2SmallProfitsThreshold: 6_725,
    class3WeeklyRate: 17.45,
    class4MainRate: 0.06,
    class4AdditionalRate: 0.02,
    class4LowerProfitsLimit: 12_570,
    class4UpperProfitsLimit: 50_270,
  },
  "2025/26": {
    catBMiddleRate: 0.0185,
    freeportUpperSecondaryThreshold: 481, // £25,000/year
    investmentZoneUpperSecondaryThreshold: 481, // £25,000/year
    class2WeeklyRate: 3.50,
    class2SmallProfitsThreshold: 6_845,
    class3WeeklyRate: 17.75,
    class4MainRate: 0.06,
    class4AdditionalRate: 0.02,
    class4LowerProfitsLimit: 12_570,
    class4UpperProfitsLimit: 50_270,
  },
};

// NI rates are UK-wide; Scottish tax years map to their English-year equivalent.
const getNIRatesForYear = (taxYear: TaxYear): ExpandedNIRates => {
  // Scottish-only years map to the matching English year
  const year = taxYear as SupportedEnglishTaxYear;
  if (!niRatesByYear[year]) {
    throw new Error(`NI rates for ${taxYear} are not available`);
  }
  return niRatesByYear[year];
};

// ─── Class 1 helpers ──────────────────────────────────────────────────────────

const getEmployeeNIRates = (
  category: NICategory,
  catAMiddleRate: number,
  catAUpperRate: number,
  niRates: ExpandedNIRates
): { middleRate: number; upperRate: number } => {
  switch (category) {
    // A-equivalent: standard rates (apprentices, under-21s, veterans, freeport/IZ general)
    case "A":
    case "H":
    case "M":
    case "V":
    case "F":
    case "N":
      return { middleRate: catAMiddleRate, upperRate: catAUpperRate };
    // B-equivalent: reduced rate for married women/widows
    case "B":
    case "I":
    case "E":
      return { middleRate: niRates.catBMiddleRate, upperRate: catAUpperRate };
    // C-equivalent: exempt (over State Pension age)
    case "C":
    case "S":
    case "K":
    case "X":
      return { middleRate: 0, upperRate: 0 };
    // J-equivalent: deferred (only upper rate applies)
    case "J":
    case "L":
    case "D":
    case "Z":
      return { middleRate: 0, upperRate: catAUpperRate };
  }
};

// Returns the effective employer-side secondary threshold (weekly £) for a given category.
// Employer NI is always: max(0, weeklySalary − effectiveThreshold) × rate × 52
const getEmployerEffectiveThreshold = (
  category: NICategory,
  standardThreshold: number,
  upperEarningsLimit: number,
  niRates: ExpandedNIRates
): number | null => {
  switch (category) {
    // Standard: full rate above secondary threshold
    case "A":
    case "B":
    case "C":
    case "J":
    case "X":
      return standardThreshold;
    // Under-21, apprentices, veterans, under-21 deferring: employer relief up to UEL
    case "H":
    case "M":
    case "V":
    case "Z":
      return upperEarningsLimit;
    // Freeport: employer relief up to freeport upper secondary threshold
    case "F":
    case "I":
    case "L":
    case "S":
      return niRates.freeportUpperSecondaryThreshold;
    // Investment Zone: employer relief up to IZ upper secondary threshold
    case "N":
    case "E":
    case "D":
    case "K":
      return niRates.investmentZoneUpperSecondaryThreshold;
  }
};

// ─── Exported Class 1 functions ───────────────────────────────────────────────

// Calculates an individual's national insurance contributions based on gross employment income.
// Pass gross PAYE employment income — NI is not reduced by non-salary-sacrifice pension contributions.
// Supports Class 1, all category letters. Defaults to Category A.
// See https://www.gov.uk/national-insurance-rates-letters/category-letters
// Uses the employee's weekly salary as a basis, as per the system, then re-converts into a year at the end.
export const calculateEmployeeNationalInsurance = ({
  taxYear,
  country,
  grossAnnualIncome,
  niCategory = "A",
}: {
  taxYear?: TaxYear;
  country?: Country;
  grossAnnualIncome: number;
  niCategory?: NICategory;
}) => {
  const weeklySalary = grossAnnualIncome / 52;
  const { NI_MIDDLE_RATE, NI_UPPER_RATE, NI_MIDDLE_BRACKET, NI_UPPER_BRACKET } =
    getHmrcRates({ taxYear, country });
  const niRates = getNIRatesForYear(taxYear ?? "2025/26");

  const { middleRate, upperRate } = getEmployeeNIRates(
    niCategory,
    NI_MIDDLE_RATE,
    NI_UPPER_RATE,
    niRates
  );

  const afterFreeSection = weeklySalary - NI_MIDDLE_BRACKET;
  let middleBracket = 0;
  let upperBracket = 0;

  if (weeklySalary > NI_UPPER_BRACKET) {
    // 2 bands apply
    const upperSection = weeklySalary - NI_UPPER_BRACKET;
    const middleSection = weeklySalary - NI_MIDDLE_BRACKET - upperSection;
    upperBracket = upperSection * upperRate;
    middleBracket = middleSection * middleRate;
  }

  if (weeklySalary < NI_UPPER_BRACKET && weeklySalary > NI_MIDDLE_BRACKET) {
    middleBracket = afterFreeSection * middleRate;
  }

  return (middleBracket + upperBracket) * 52;
};

// Calculates employer national insurance contributions based on an employee's gross employment income.
// Pass gross PAYE employment income — NI is not reduced by non-salary-sacrifice pension contributions.
// Supports Class 1, all category letters. Defaults to Category A.
// See https://www.gov.uk/national-insurance-rates-letters/category-letters
// Uses the employee's weekly salary as a basis, as per the system, then re-converts into a year at the end.
export const calculateEmployerNationalInsurance = ({
  taxYear,
  country,
  grossAnnualIncome,
  niCategory = "A",
}: {
  taxYear?: TaxYear;
  country?: Country;
  grossAnnualIncome: number;
  niCategory?: NICategory;
}) => {
  const weeklySalary = grossAnnualIncome / 52;
  const { EMPLOYER_NI_RATE, EMPLOYER_NI_SECONDARY_THRESHOLD, NI_UPPER_BRACKET } =
    getHmrcRates({ taxYear, country });
  const niRates = getNIRatesForYear(taxYear ?? "2025/26");

  const effectiveThreshold = getEmployerEffectiveThreshold(
    niCategory,
    EMPLOYER_NI_SECONDARY_THRESHOLD,
    NI_UPPER_BRACKET,
    niRates
  );

  // Category X: exempt from employer NI entirely
  if (effectiveThreshold === null || niCategory === "X") {
    return 0;
  }

  if (weeklySalary <= effectiveThreshold) {
    return 0;
  }

  return (weeklySalary - effectiveThreshold) * EMPLOYER_NI_RATE * 52;
};

// ─── Exported Class 2 function ────────────────────────────────────────────────

// Calculates Class 2 NI for self-employed individuals.
// For 2024/25 onwards, Class 2 is treated as automatically paid (no actual payment due)
// for those above the small profits threshold, so this returns 0.
// For 2022/23 and 2023/24, returns the annual Class 2 amount if profit >= small profits threshold.
// See https://www.gov.uk/self-employed-national-insurance-rates
export const calculateClass2NationalInsurance = ({
  taxYear,
  grossAnnualProfit,
}: {
  taxYear?: TaxYear;
  grossAnnualProfit?: number;
}) => {
  const yearToUse = taxYear ?? "2025/26";
  const niRates = getNIRatesForYear(yearToUse);

  // From 2024/25, Class 2 is treated as paid — no actual payment required
  if (yearToUse === "2024/25" || yearToUse === "2025/26") {
    return 0;
  }

  // For 2022/23 and 2023/24: payable if profit >= small profits threshold
  const profit = grossAnnualProfit ?? niRates.class2SmallProfitsThreshold;
  if (profit < niRates.class2SmallProfitsThreshold) {
    return 0; // Below threshold: no Class 2 obligation (voluntary payment not modelled)
  }

  return niRates.class2WeeklyRate * 52;
};

// ─── Exported Class 3 function ────────────────────────────────────────────────

// Returns the annual cost of voluntary Class 3 NI contributions.
// Used to fill gaps in an NI record when not working or earning below thresholds.
// See https://www.gov.uk/voluntary-national-insurance-contributions
export const calculateClass3NationalInsurance = ({
  taxYear,
}: {
  taxYear?: TaxYear;
}) => {
  const niRates = getNIRatesForYear(taxYear ?? "2025/26");
  return niRates.class3WeeklyRate * 52;
};

// ─── Exported Class 4 function ────────────────────────────────────────────────

// Calculates Class 4 NI for self-employed individuals based on annual trading profit.
// Class 4 does not count towards state benefits or pensions.
// See https://www.gov.uk/self-employed-national-insurance-rates
export const calculateClass4NationalInsurance = ({
  taxYear,
  grossAnnualProfit,
}: {
  taxYear?: TaxYear;
  grossAnnualProfit: number;
}) => {
  const niRates = getNIRatesForYear(taxYear ?? "2025/26");
  const { class4LowerProfitsLimit, class4UpperProfitsLimit, class4MainRate, class4AdditionalRate } =
    niRates;

  if (grossAnnualProfit <= class4LowerProfitsLimit) {
    return 0;
  }

  let mainBand = 0;
  let additionalBand = 0;

  if (grossAnnualProfit > class4UpperProfitsLimit) {
    const aboveUpper = grossAnnualProfit - class4UpperProfitsLimit;
    const middleSection = class4UpperProfitsLimit - class4LowerProfitsLimit;
    additionalBand = aboveUpper * class4AdditionalRate;
    mainBand = middleSection * class4MainRate;
  } else {
    mainBand = (grossAnnualProfit - class4LowerProfitsLimit) * class4MainRate;
  }

  return mainBand + additionalBand;
};
