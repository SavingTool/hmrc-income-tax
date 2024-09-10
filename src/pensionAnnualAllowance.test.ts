import { calculatePensionAnnualAllowance } from "./pensionAnnualAllowance";

describe("calculatePensionAnnualAllowance (24/25)", () => {
  test("Fidelity Example 1", () => {
    const result = calculatePensionAnnualAllowance({
      taxableAnnualIncome: 210_000,
      employeeDcPensionContributions: 0,
      employerDcPensionContributions: 20_000,
    });

    expect(result).toEqual({
      adjustedIncome: 230_000,
      thresholdIncome: 210_000,
      reduction: 0,
      allowance: 60_000,
    });
  });

  test("Fidelity Example 2", () => {
    const result = calculatePensionAnnualAllowance({
      taxableAnnualIncome: 235_000,
      employeeDcPensionContributions: 0,
      employerDcPensionContributions: 60_000,
    });

    expect(result).toEqual({
      adjustedIncome: 295_000,
      thresholdIncome: 235_000,
      reduction: 17_500,
      allowance: 42_500,
    });
  });

  test("AJ Bell Example 1", () => {
    const result = calculatePensionAnnualAllowance({
      taxableAnnualIncome: 200_000,
      retrospectivePensionPaymentsTaxRelief: 20_000,
      employeeDcPensionContributions: 0,
      employerDcPensionContributions: 20_000,
    });

    expect(result).toEqual({
      adjustedIncome: 220_000,
      thresholdIncome: 180_000,
      reduction: 0,
      allowance: 60_000,
    });
  });

  test("AJ Bell Example 2", () => {
    const result = calculatePensionAnnualAllowance({
      taxableAnnualIncome: 230_000,
      retrospectivePensionPaymentsTaxRelief: 10_000,
      employeeDcPensionContributions: 0,
      employerDcPensionContributions: 50_000,
    });

    expect(result).toEqual({
      adjustedIncome: 280_000,
      thresholdIncome: 220_000,
      reduction: 10_000,
      allowance: 50_000,
    });
  });
});
