import { calculateDividendTax } from "./dividendTax";

// All test cases use 2025/26 rates (HIGHER_BRACKET=50270, ADDITIONAL_BRACKET=125140, DIVIDEND_ALLOWANCE=500)
// Dividend rates: basic 8.75%, higher 33.75%, additional 39.35%
// Band positions ("bandStart") are in taxable income terms (after the personal allowance):
// basic band is 0-37700 (HIGHER_BRACKET - DEFAULT_PERSONAL_ALLOWANCE), higher band up to 125140.

describe("calculateDividendTax (25/26)", () => {
  test("zero dividend income", () => {
    expect(
      calculateDividendTax({
        taxYear: "2025/26",
        nonDividendTaxableIncome: 30_000,
        dividendIncome: 0,
      })
    ).toEqual({
      total: 0,
      breakdown: {
        basicRateDividendTax: 0,
        higherRateDividendTax: 0,
        additionalRateDividendTax: 0,
      },
    });
  });

  test("all covered by personal allowance and dividend allowance", () => {
    // nonDividend=5000, dividend=7000, PA=12570
    // paRemainingForDividends=7570, dividendAfterPA=0 → no tax
    expect(
      calculateDividendTax({
        taxYear: "2025/26",
        nonDividendTaxableIncome: 5_000,
        dividendIncome: 7_000,
      })
    ).toEqual({
      total: 0,
      breakdown: {
        basicRateDividendTax: 0,
        higherRateDividendTax: 0,
        additionalRateDividendTax: 0,
      },
    });
  });

  test("all basic rate - salary + small dividend", () => {
    // nonDividend=30000, dividend=5000, PA=12570
    // dividendAfterPA=5000, allowanceUsed=500, taxableDividends=4500
    // bandStart=(30000-12570)+500=17930, all below 37700 → basic: 4500 × 8.75% = 393.75
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
    // bandStart=(48000-12570)+500=35930, basic: (37700-35930)=1770 × 8.75%=154.875, higher: 2730 × 33.75%=921.375
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
    // bandStart=500, 500+16930=17430 < 37700 → all basic: 16930 × 8.75% = 1481.375
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
    // dividendAfterPA=47430, taxableDividends=46930, bandStart=500
    // basic: (37700-500)=37200 × 8.75%=3255, higher: 9730 × 33.75%=3283.875
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
    // basic: (37700-500)=37200 × 8.75%=3255
    // higher: (125140-37700)=87440 × 33.75%=29511
    // additional: 74860 × 39.35%=29457.41
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 0,
      dividendIncome: 200_000,
    });
    expect(result.total).toBeCloseTo(62223.41, 1);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(3255, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(29511, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(29457.41, 1);
  });

  test("partial PA remaining for dividends", () => {
    // nonDividend=5000, dividend=20000, PA=12570
    // paRemainingForDividends=7570, dividendAfterPA=12430, allowanceUsed=500, taxableDividends=11930
    // bandStart=500, 500+11930=12430 < 37700 → all basic: 11930 × 8.75% = 1043.875
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

// 2026/27 rates: basic 10.75%, higher 35.75%, additional 39.35% (dividend rates increased from April 2026)
// See https://www.gov.uk/government/publications/changes-to-tax-rates-for-property-savings-dividend-income
describe("calculateDividendTax (26/27)", () => {
  test("all basic rate - salary + small dividend", () => {
    // nonDividend=30000, dividend=5000, PA=12570
    // dividendAfterPA=5000, allowanceUsed=500, taxableDividends=4500
    // bandStart=(30000-12570)+500=17930, all below 37700 → basic: 4500 × 10.75% = 483.75
    const result = calculateDividendTax({
      taxYear: "2026/27",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 5_000,
    });
    expect(result.total).toBeCloseTo(483.75, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(483.75, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(0, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("straddles basic and higher rate bands", () => {
    // nonDividend=48000, dividend=5000, PA=12570
    // bandStart=35930, basic: (37700-35930)=1770 × 10.75%=190.275, higher: 2730 × 35.75%=975.975
    const result = calculateDividendTax({
      taxYear: "2026/27",
      nonDividendTaxableIncome: 48_000,
      dividendIncome: 5_000,
    });
    expect(result.total).toBeCloseTo(1166.25, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(190.275, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(975.975, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("high earner with no personal allowance, higher and additional rate", () => {
    // nonDividend=120000, dividend=10000, total=130000 → PA=0
    // dividendAfterPA=10000, allowanceUsed=500, taxableDividends=9500
    // bandStart=120500, higher: (125140-120500)=4640 × 35.75%=1658.8, additional: 4860 × 39.35%=1912.41
    const result = calculateDividendTax({
      taxYear: "2026/27",
      nonDividendTaxableIncome: 120_000,
      dividendIncome: 10_000,
    });
    expect(result.total).toBeCloseTo(3571.21, 1);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(0, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(1658.8, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(1912.41, 1);
  });

  // Personal allowance taper: the basic rate band stays £37,700 of taxable income, so a reduced
  // PA must not widen the gross-income basic band (i.e. the higher rate starts at PA + 37,700).
  test("tapered PA: salary + dividends straddling basic and higher rate", () => {
    // nonDividend=30000, dividend=90000, total=120000 → PA=12570-10000=2570
    // taxable nonDividend=27430, allowanceUsed=500, taxableDividends=89500, bandStart=27930
    // basic: (37700-27930)=9770 × 10.75%=1050.275, higher: 79730 × 35.75%=28503.475
    const result = calculateDividendTax({
      taxYear: "2026/27",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 90_000,
    });
    expect(result.total).toBeCloseTo(29553.75, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(1050.275, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(28503.475, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("tapered PA: salary fills the basic band, all dividends at higher rate", () => {
    // nonDividend=40000, dividend=80000, total=120000 → PA=2570
    // taxable nonDividend=37430, allowanceUsed=500, bandStart=37930 > 37700
    // higher: 79500 × 35.75%=28421.25
    const result = calculateDividendTax({
      taxYear: "2026/27",
      nonDividendTaxableIncome: 40_000,
      dividendIncome: 80_000,
    });
    expect(result.total).toBeCloseTo(28421.25, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(0, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(28421.25, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("tapered PA: pure dividend income", () => {
    // nonDividend=0, dividend=120000 → PA=2570
    // dividendAfterPA=117430, allowanceUsed=500, taxableDividends=116930, bandStart=500
    // basic: (37700-500)=37200 × 10.75%=3999, higher: 79730 × 35.75%=28503.475
    const result = calculateDividendTax({
      taxYear: "2026/27",
      nonDividendTaxableIncome: 0,
      dividendIncome: 120_000,
    });
    expect(result.total).toBeCloseTo(32502.475, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(3999, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(28503.475, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("fully tapered PA: large dividend income hitting all three bands", () => {
    // nonDividend=0, dividend=200000 → PA=0
    // taxableDividends=199500, bandStart=500
    // basic: 37200 × 10.75%=3999, higher: 87440 × 35.75%=31259.8, additional: 74860 × 39.35%=29457.41
    const result = calculateDividendTax({
      taxYear: "2026/27",
      nonDividendTaxableIncome: 0,
      dividendIncome: 200_000,
    });
    expect(result.total).toBeCloseTo(64716.21, 1);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(3999, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(31259.8, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(29457.41, 1);
  });
});

// Spot-check 2023/24 (ADDITIONAL_BRACKET=125140, DIVIDEND_ALLOWANCE=1000)
describe("calculateDividendTax (23/24)", () => {
  test("all basic rate", () => {
    // dividend allowance is £1,000 in 23/24
    // nonDividend=30000, dividend=5000, dividendAfterPA=5000
    // allowanceUsed=1000, taxableDividends=4000, bandStart=(30000-12570)+1000=18430
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
    // allowanceUsed=2000, taxableDividends=3000, bandStart=(30000-12570)+2000=19430
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

// Personal allowance taper in other tax years: nonDividend=30000, dividend=90000, total=120000 → PA=2570
// taxable nonDividend=27430; bands in taxable terms: basic 0-37700, higher up to ADDITIONAL_BRACKET
describe("calculateDividendTax with tapered personal allowance (other years)", () => {
  test("2025/26", () => {
    // allowanceUsed=500, taxableDividends=89500, bandStart=27930
    // basic: 9770 × 8.75%=854.875, higher: 79730 × 33.75%=26908.875
    const result = calculateDividendTax({
      taxYear: "2025/26",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 90_000,
    });
    expect(result.total).toBeCloseTo(27763.75, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(854.875, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(26908.875, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("2024/25", () => {
    // Same rates and dividend allowance as 2025/26
    const result = calculateDividendTax({
      taxYear: "2024/25",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 90_000,
    });
    expect(result.total).toBeCloseTo(27763.75, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(854.875, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(26908.875, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("2023/24", () => {
    // allowanceUsed=1000, taxableDividends=89000, bandStart=28430
    // basic: 9270 × 8.75%=811.125, higher: 79730 × 33.75%=26908.875
    const result = calculateDividendTax({
      taxYear: "2023/24",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 90_000,
    });
    expect(result.total).toBeCloseTo(27720, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(811.125, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(26908.875, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("2022/23", () => {
    // allowanceUsed=2000, taxableDividends=88000, bandStart=29430
    // basic: 8270 × 8.75%=723.625, higher: 79730 × 33.75%=26908.875
    const result = calculateDividendTax({
      taxYear: "2022/23",
      nonDividendTaxableIncome: 30_000,
      dividendIncome: 90_000,
    });
    expect(result.total).toBeCloseTo(27632.5, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(723.625, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(26908.875, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(0, 2);
  });

  test("2022/23 fully tapered PA, all three bands (ADDITIONAL_BRACKET=150000)", () => {
    // nonDividend=0, dividend=200000 → PA=0
    // allowanceUsed=2000, taxableDividends=198000, bandStart=2000
    // basic: 35700 × 8.75%=3123.75, higher: (150000-37700)=112300 × 33.75%=37901.25
    // additional: 50000 × 39.35%=19675
    const result = calculateDividendTax({
      taxYear: "2022/23",
      nonDividendTaxableIncome: 0,
      dividendIncome: 200_000,
    });
    expect(result.total).toBeCloseTo(60700, 2);
    expect(result.breakdown.basicRateDividendTax).toBeCloseTo(3123.75, 2);
    expect(result.breakdown.higherRateDividendTax).toBeCloseTo(37901.25, 2);
    expect(result.breakdown.additionalRateDividendTax).toBeCloseTo(19675, 2);
  });
});
