import { getHmrcRates } from "./hmrc";

describe("getHmrcRates", () => {
  test("It uses default 2024/25 rates", () => {
    const rates = getHmrcRates();
    expect(rates.DEFAULT_PERSONAL_ALLOWANCE).toEqual(12570);
    expect(rates.NI_MIDDLE_RATE).toEqual(0.08);
  });

  test("It uses explicit 2022/23 rates", () => {
    expect(getHmrcRates("2022/23").DEFAULT_PERSONAL_ALLOWANCE).toEqual(12570);
  });

  test("It uses explicit 2023/24 rates", () => {
    expect(getHmrcRates("2023/24").DEFAULT_PERSONAL_ALLOWANCE).toEqual(12570);
  });

  test("It uses explicit 2024/25 rates", () => {
    expect(getHmrcRates("2024/25").DEFAULT_PERSONAL_ALLOWANCE).toEqual(12570);
  });
});
