export interface IncomeTax {
  basicRateTax: number;
  higherRateTax: number;
  additionalRateTax: number;
}

export type StudentLoanPlan = 1 | 2 | 4 | 5 | "postgrad";

export type TaxYear = "2022/23" | "2023/24" | "2024/25";

// There are two sets of rates for income tax for the UK
export type Country = "England/NI/Wales" | "Scotland";
