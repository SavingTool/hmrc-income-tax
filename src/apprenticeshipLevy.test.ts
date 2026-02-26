import { calculateApprenticeshipLevy } from "./apprenticeshipLevy";

// Rate is 0.5% of annual pay bill minus £15,000 allowance (same across all supported tax years)
const expectations = [
  { annualPayBill: 0, levy: 0 },
  { annualPayBill: 1_000_000, levy: 0 }, // 1m × 0.5% = 5k, below £15k allowance
  { annualPayBill: 3_000_000, levy: 0 }, // 3m × 0.5% = 15k, exactly at allowance
  { annualPayBill: 4_000_000, levy: 5_000 }, // 4m × 0.5% - 15k = 5k
  { annualPayBill: 5_000_000, levy: 10_000 },
  { annualPayBill: 10_000_000, levy: 35_000 },
  { annualPayBill: 50_000_000, levy: 235_000 },
];

describe("calculateApprenticeshipLevy (24/25)", () => {
  expectations.forEach((expectation) => {
    const { annualPayBill, levy } = expectation;
    test(annualPayBill.toString(), () => {
      expect(
        calculateApprenticeshipLevy({
          taxYear: "2024/25",
          annualPayBill,
        })
      ).toBeCloseTo(levy, 1);
    });
  });
});

describe("calculateApprenticeshipLevy (25/26)", () => {
  expectations.forEach((expectation) => {
    const { annualPayBill, levy } = expectation;
    test(annualPayBill.toString(), () => {
      expect(
        calculateApprenticeshipLevy({
          taxYear: "2025/26",
          annualPayBill,
        })
      ).toBeCloseTo(levy, 1);
    });
  });
});
