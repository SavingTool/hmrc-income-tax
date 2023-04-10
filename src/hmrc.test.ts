import { getHmrcRates } from "./hmrc";

describe("getHmrcRates", () => {
  test("It uses default 2023/24 rates", () => {
    expect(getHmrcRates().DEFAULT_PERSONAL_ALLOWANCE).toEqual(12570);
  });

  test("It uses explicit 2022/23 rates", () => {
    expect(getHmrcRates("2022/23").DEFAULT_PERSONAL_ALLOWANCE).toEqual(12570);
  });

  test("It uses explicit 2023/24 rates", () => {
    expect(getHmrcRates("2023/24").DEFAULT_PERSONAL_ALLOWANCE).toEqual(12570);
  });
});
