export interface IncomeTax {
  basicRateTax: number;
  higherRateTax: number;
  additionalRateTax: number;
}

export type StudentLoanPlan = 1 | 2 | 4 | 5 | "postgrad";

export type TaxYear = "2022/23" | "2023/24" | "2024/25";
