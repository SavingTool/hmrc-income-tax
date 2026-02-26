import { calculateCorporationTax } from "./corporationTax";

// 2022/23: flat 19% rate
const expectations2223 = [
  { profits: 0, tax: 0 },
  { profits: 10_000, tax: 1_900 },
  { profits: 50_000, tax: 9_500 },
  { profits: 100_000, tax: 19_000 },
  { profits: 250_000, tax: 47_500 },
  { profits: 500_000, tax: 95_000 },
  { profits: 1_000_000, tax: 190_000 },
];

describe("calculateCorporationTax (22/23)", () => {
  expectations2223.forEach((expectation) => {
    const { profits, tax } = expectation;
    test(profits.toString(), () => {
      expect(
        calculateCorporationTax({
          taxYear: "2022/23",
          profits,
        })
      ).toBeCloseTo(tax, 1);
    });
  });
});

// 2023/24 onwards: 19% small profits rate up to £50k, 25% main rate above £250k, marginal relief between
const expectations2324 = [
  { profits: 0, tax: 0 },
  { profits: 10_000, tax: 1_900 }, // small profits rate: 10000 × 19%
  { profits: 50_000, tax: 9_500 }, // at lower threshold: 50000 × 19%
  { profits: 100_000, tax: 22_750 }, // marginal relief: 100000 × 25% - (3/200) × 150000
  { profits: 150_000, tax: 36_000 }, // marginal relief: 150000 × 25% - (3/200) × 100000
  { profits: 200_000, tax: 49_250 }, // marginal relief: 200000 × 25% - (3/200) × 50000
  { profits: 250_000, tax: 62_500 }, // at upper threshold: 250000 × 25%
  { profits: 300_000, tax: 75_000 }, // above upper threshold: 300000 × 25%
  { profits: 1_000_000, tax: 250_000 },
];

describe("calculateCorporationTax (23/24)", () => {
  expectations2324.forEach((expectation) => {
    const { profits, tax } = expectation;
    test(profits.toString(), () => {
      expect(
        calculateCorporationTax({
          taxYear: "2023/24",
          profits,
        })
      ).toBeCloseTo(tax, 1);
    });
  });
});

describe("calculateCorporationTax (24/25)", () => {
  expectations2324.forEach((expectation) => {
    const { profits, tax } = expectation;
    test(profits.toString(), () => {
      expect(
        calculateCorporationTax({
          taxYear: "2024/25",
          profits,
        })
      ).toBeCloseTo(tax, 1);
    });
  });
});

describe("calculateCorporationTax (25/26)", () => {
  expectations2324.forEach((expectation) => {
    const { profits, tax } = expectation;
    test(profits.toString(), () => {
      expect(
        calculateCorporationTax({
          taxYear: "2025/26",
          profits,
        })
      ).toBeCloseTo(tax, 1);
    });
  });
});
