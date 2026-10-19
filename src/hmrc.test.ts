import { getHmrcRates } from "./hmrc";

describe("getHmrcRates", () => {
  test("It uses default 2026/27 rates", () => {
    const rates = getHmrcRates();
    expect(rates.DEFAULT_PERSONAL_ALLOWANCE).toEqual(12570);
    expect(rates.NI_MIDDLE_RATE).toEqual(0.08);
  });

  test("It uses explicit 2022/23 rates", () => {
    expect(
      getHmrcRates({ taxYear: "2022/23", country: "England/NI/Wales" })
        .DEFAULT_PERSONAL_ALLOWANCE
    ).toEqual(12570);
  });

  test("It uses explicit 2023/24 rates", () => {
    expect(
      getHmrcRates({ taxYear: "2023/24", country: "England/NI/Wales" })
        .DEFAULT_PERSONAL_ALLOWANCE
    ).toEqual(12570);
  });

  test("It uses explicit 2024/25 rates", () => {
    expect(
      getHmrcRates({ taxYear: "2024/25", country: "England/NI/Wales" })
        .DEFAULT_PERSONAL_ALLOWANCE
    ).toEqual(12570);
  });

  test("It uses explicit 2025/26 rates", () => {
    expect(
      getHmrcRates({ taxYear: "2025/26", country: "England/NI/Wales" })
        .DEFAULT_PERSONAL_ALLOWANCE
    ).toEqual(12570);
  });

  test("It uses explicit 2026/27 rates", () => {
    expect(
      getHmrcRates({ taxYear: "2026/27", country: "England/NI/Wales" })
        .DEFAULT_PERSONAL_ALLOWANCE
    ).toEqual(12570);
  });
});

describe("2026/27 student loan thresholds", () => {
  const countries = ["England/NI/Wales", "Scotland"] as const;
  countries.forEach((country) => {
    test(`It uses the correct annual thresholds (${country})`, () => {
      const rates = getHmrcRates({ taxYear: "2026/27", country });
      expect(rates.STUDENT_LOAN_PLAN_1_WEEKLY_THRESHOLD * 52).toBeCloseTo(
        26_900
      );
      expect(rates.STUDENT_LOAN_PLAN_2_WEEKLY_THRESHOLD * 52).toBeCloseTo(
        29_385
      );
      expect(rates.STUDENT_LOAN_PLAN_4_WEEKLY_THRESHOLD * 52).toBeCloseTo(
        33_795
      );
    });
  });
});
