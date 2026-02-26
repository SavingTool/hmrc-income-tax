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
      carryForward: 0,
      availableAllowance: 60_000,
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
      carryForward: 0,
      availableAllowance: 42_500,
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
      carryForward: 0,
      availableAllowance: 60_000,
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
      carryForward: 0,
      availableAllowance: 50_000,
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
        carryForward: 0,
        availableAllowance: 57_500,
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
        carryForward: 0,
        availableAllowance: 25_000,
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
        carryForward: 0,
        availableAllowance: 57_500,
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
        carryForward: 0,
        availableAllowance: 33_000,
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
        carryForward: 0,
        availableAllowance: 35_000,
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
      carryForward: 0,
      availableAllowance: 47_000,
    });
  });
});

describe("calculatePensionAnnualAllowance - carry forward", () => {
  test("carry forward added to untapered allowance", () => {
    // £210k income, no tapering. £30k carry forward from previous years.
    const result = calculatePensionAnnualAllowance({
      totalAnnualIncome: 210_000,
      employerDcPensionContributions: 20_000,
      annualAllowanceCarryForward: 30_000,
    });

    expect(result).toEqual({
      adjustedIncome: 230_000,
      thresholdIncome: 210_000,
      reduction: 0,
      allowance: 60_000,
      carryForward: 30_000,
      availableAllowance: 90_000,
    });
  });

  test("carry forward added to tapered allowance", () => {
    // £295k adjusted income → £17,500 reduction → £42,500 tapered allowance.
    // £20k carry forward from previous years gives £62,500 total.
    const result = calculatePensionAnnualAllowance({
      totalAnnualIncome: 235_000,
      employerDcPensionContributions: 60_000,
      annualAllowanceCarryForward: 20_000,
    });

    expect(result).toEqual({
      adjustedIncome: 295_000,
      thresholdIncome: 235_000,
      reduction: 17_500,
      allowance: 42_500,
      carryForward: 20_000,
      availableAllowance: 62_500,
    });
  });

  test("carry forward added to minimum tapered allowance", () => {
    // Very high income → tapered to minimum £10k allowance.
    // £45k carry forward gives £55k total available.
    const result = calculatePensionAnnualAllowance({
      totalAnnualIncome: 400_000,
      annualAllowanceCarryForward: 45_000,
    });

    expect(result).toEqual({
      adjustedIncome: 400_000,
      thresholdIncome: 400_000,
      reduction: 70_000,
      allowance: 10_000,
      carryForward: 45_000,
      availableAllowance: 55_000,
    });
  });

  test("zero carry forward behaves identically to omitting it", () => {
    const withZero = calculatePensionAnnualAllowance({
      totalAnnualIncome: 265_000,
      annualAllowanceCarryForward: 0,
    });

    const withoutCarryForward = calculatePensionAnnualAllowance({
      totalAnnualIncome: 265_000,
    });

    expect(withZero).toEqual(withoutCarryForward);
  });
});
