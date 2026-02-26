import { calculateDividendTax } from "./dividendTax";

// All test cases use 2025/26 rates (HIGHER_BRACKET=50270, ADDITIONAL_BRACKET=125140, DIVIDEND_ALLOWANCE=500)
// Dividend rates: basic 8.75%, higher 33.75%, additional 39.35%

describe("calculateDividendTax (25/26)", () => {
  test("zero dividend income", () => {
    expect(
      calculateDividendTax({ taxYear: "2025/26", nonDividendTaxableIncome: 30_000, dividendIncome: 0 })
    ).toEqual({ total: 0, breakdown: { basicRateDividendTax: 0, higherRateDividendTax: 0, additionalRateDividendTax: 0 } });
  });

  test("all covered by personal allowance and dividend allowance", () => {
    // nonDividend=5000, dividend=7000, PA=12570
    // paRemainingForDividends=7570, dividendAfterPA=0 → no tax
    expect(
      calculateDividendTax({ taxYear: "2025/26", nonDividendTaxableIncome: 5_000, dividendIncome: 7_000 })
    ).toEqual({ total: 0, breakdown: { basicRateDividendTax: 0, higherRateDividendTax: 0, additionalRateDividendTax: 0 } });
  });

  test("all basic rate - salary + small dividend", () => {
    // nonDividend=30000, dividend=5000, PA=12570
    // dividendAfterPA=5000, allowanceUsed=500, taxableDividends=4500
    // bandStart=30500, all below 50270 → basic: 4500 × 8.75% = 393.75
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 5_000,
    });
    expect(result.total).toBeCloseTo(393.75, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(393.75, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(0, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("straddles basic and higher rate bands", () => {
    // nonDividend=48000, dividend=5000, PA=12570
    // bandStart=48500, basic: (50270-48500)=1770 × 8.75%=154.875, higher: 2730 × 33.75%=921.375
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 48_000,
      dividendIncome: 5_000,
    });
    expect(result.total).toBeCloseTo(1076.25, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(154.875, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(921.375, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("pure dividend income, all basic rate", () => {
    // nonDividend=0, dividend=30000, PA=12570
    // dividendAfterPA=17430, allowanceUsed=500, taxableDividends=16930
    // bandStart=13070, 13070+16930=30000 < 50270 → all basic: 16930 × 8.75% = 1481.375
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 0,
      dividendIncome: 30_000,
    });
    expect(result.total).toBeCloseTo(1481.375, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(1481.375, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(0, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("pure dividend income, basic and higher rate", () => {
    // nonDividend=0, dividend=60000, PA=12570
    // dividendAfterPA=47430, taxableDividends=46930, bandStart=13070
    // basic: (50270-13070)=37200 × 8.75%=3255, higher: 9730 × 33.75%=3283.875
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 0,
      dividendIncome: 60_000,
    });
    expect(result.total).toBeCloseTo(6538.875, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(3255, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(3283.875, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("high earner with no personal allowance, higher and additional rate", () => {
    // nonDividend=120000, dividend=10000, total=130000 → PA=0
    // dividendAfterPA=10000, allowanceUsed=500, taxableDividends=9500
    // bandStart=120500, higher: (125140-120500)=4640 × 33.75%=1566, additional: 4860 × 39.35%=1912.41
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 120_000,
      dividendIncome: 10_000,
    });
    expect(result.total).toBeCloseTo(3478.41, 1);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(0, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(1566, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(1912.41, 1);
  });

  test("large dividend income hitting all three bands (PA=0)", () => {
    // nonDividend=0, dividend=200000, PA=0 (PA fully tapered: total>125140)
    // dividendAfterPA=200000, allowanceUsed=500, taxableDividends=199500, bandStart=500
    // basic: (50270-500)=49770 × 8.75%=4354.875
    // higher: (125140-50270)=74870 × 33.75%=25268.625
    // additional: 74860 × 39.35%=29457.41
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 0,
      dividendIncome: 200_000,
    });
    expect(result.total).toBeCloseTo(59080.91, 1);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(4354.875, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(25268.625, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(29457.41, 1);
  });

  test("partial PA remaining for dividends", () => {
    // nonDividend=5000, dividend=20000, PA=12570
    // paRemainingForDividends=7570, dividendAfterPA=12430, allowanceUsed=500, taxableDividends=11930
    // bandStart=13070, 13070+11930=25000 < 50270 → all basic: 11930 × 8.75% = 1043.875
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 5_000,
      dividendIncome: 20_000,
    });
    expect(result.total).toBeCloseTo(1043.875, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(1043.875, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(0, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("explicit personalAllowance override", () => {
    // Same as partial PA test but with explicit PA passed in
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 5_000,
      dividendIncome: 20_000,
      personalAllowance: 12_570,
    });
    expect(result.total).toBeCloseTo(1043.875, 2);
  });
});

// Spot-check 2023/24 (ADDITIONAL_BRACKET=125140, DIVIDEND_ALLOWANCE=1000)
describe("calculateDividendTax (23/24)", () => {
  test("all basic rate", () => {
    // dividend allowance is £1,000 in 23/24
    // nonDividend=30000, dividend=5000, dividendAfterPA=5000
    // allowanceUsed=1000, taxableDividends=4000, bandStart=31000
    // basic: 4000 × 8.75% = 350
    const result = calculateDividendTax({
      taxYear: "2023/24",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 5_000,
    });
    expect(result.total).toBeCloseTo(350, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(350, 2);
  });
});

// Spot-check 2022/23 (DIVIDEND_ALLOWANCE=2000, ADDITIONAL_BRACKET=150000)
describe("calculateDividendTax (22/23)", () => {
  test("all basic rate with larger dividend allowance", () => {
    // nonDividend=30000, dividend=5000
    // allowanceUsed=2000, taxableDividends=3000, bandStart=32000
    // basic: 3000 × 8.75% = 262.5
    const result = calculateDividendTax({
      taxYear: "2022/23",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 5_000,
    });
    expect(result.total).toBeCloseTo(262.5, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(262.5, 2);
  });
});
