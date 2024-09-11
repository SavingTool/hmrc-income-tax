import { calculatePensionAnnualAllowance } from "./pensionAnnualAllowance";

describe("calculatePensionAnnualAllowance (24/25)", () => {
  test("Fidelity Example 1", () => {
    const result = calculatePensionAnnualAllowance({
      totalAnnualIncome: 210_000,
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
      totalAnnualIncome: 235_000,
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
      totalAnnualIncome: 200_000,
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
      totalAnnualIncome: 230_000,
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

  describe("Quilter Examples", () => {
    test("Example A", () => {
      const result = calculatePensionAnnualAllowance({
        totalAnnualIncome: 265_000,
        retrospectivePensionPaymentsTaxRelief: 0,
        employeeDcPensionContributions: 0,
        employerDcPensionContributions: 0,
      });

      expect(result).toEqual({
        adjustedIncome: 265_000,
        thresholdIncome: 265_000,
        reduction: 2500,
        allowance: 57_500,
      });
    });

    test("Example B", () => {
      const result = calculatePensionAnnualAllowance({
        totalAnnualIncome: 330_000,
        retrospectivePensionPaymentsTaxRelief: 20_000,
        employeeDcPensionContributions: 0,
        employerDcPensionContributions: 0,
      });

      expect(result).toEqual({
        adjustedIncome: 330_000,
        thresholdIncome: 310_000,
        reduction: 35_000,
        allowance: 25_000,
      });
    });

    test("Example C", () => {
      const result = calculatePensionAnnualAllowance({
        totalAnnualIncome: 245_000,
        retrospectivePensionPaymentsTaxRelief: 0,
        employeeDcPensionContributions: 20_000,
        employerDcPensionContributions: 0,
      });

      expect(result).toEqual({
        adjustedIncome: 265_000,
        thresholdIncome: 265_000,
        reduction: 2_500,
        allowance: 57_500,
      });
    });
  });

  describe("Royal London Examples", () => {
    // Examples that use carry forward or DB pensions are not included
    test("Example 1", () => {
      const result = calculatePensionAnnualAllowance({
        totalAnnualIncome: 284_000,
        retrospectivePensionPaymentsTaxRelief: 15_000,
        employeeDcPensionContributions: 0,
        employerDcPensionContributions: 30_000,
      });

      expect(result).toEqual({
        adjustedIncome: 314_000,
        thresholdIncome: 269_000,
        reduction: 27_000,
        allowance: 33_000,
      });
    });

    test("Example 5", () => {
      const result = calculatePensionAnnualAllowance({
        totalAnnualIncome: 270_000,
        retrospectivePensionPaymentsTaxRelief: 0,
        employeeDcPensionContributions: 20_000,
        employerDcPensionContributions: 20_000,
      });

      expect(result).toEqual({
        adjustedIncome: 310_000,
        thresholdIncome: 290_000,
        reduction: 25_000,
        allowance: 35_000,
      });
    });
  });

  test("HL example", () => {
    const result = calculatePensionAnnualAllowance({
      totalAnnualIncome: 250_000,
      retrospectivePensionPaymentsTaxRelief: 24_000,
      employeeDcPensionContributions: 0,
      employerDcPensionContributions: 36_000,
    });

    expect(result).toEqual({
      adjustedIncome: 286_000,
      thresholdIncome: 226_000,
      reduction: 13_000,
      allowance: 47_000,
    });
  });
});
