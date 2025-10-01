import { roundToPence } from "./utils";

describe("roundToPence", () => {
  test("rounds down when amount is less than 0.005", () => {
    expect(roundToPence(209.1599999999999)).toBe(209.16);
    expect(roundToPence(100.004)).toBe(100.0);
    expect(roundToPence(100.001)).toBe(100.0);
  });

  test("rounds up when amount is 0.005 or more", () => {
    expect(roundToPence(100.005)).toBe(100.01);
    expect(roundToPence(100.009)).toBe(100.01);
    expect(roundToPence(209.155)).toBe(209.16);
  });

  test("handles already rounded values", () => {
    expect(roundToPence(100.0)).toBe(100.0);
    expect(roundToPence(209.16)).toBe(209.16);
  });

  test("handles zero", () => {
    expect(roundToPence(0)).toBe(0);
    expect(roundToPence(0.001)).toBe(0);
  });

  test("handles negative values", () => {
    // Note: Tax calculations should not produce negative values in practice
    // Math.round() rounds -100.005 to -100 (rounds towards zero for halfway case)
    expect(roundToPence(-100.005)).toBe(-100);
    expect(roundToPence(-100.004)).toBe(-100.0);
    expect(roundToPence(-100.006)).toBe(-100.01);
  });

  test("handles large values with floating-point artifacts", () => {
    expect(roundToPence(88184.15999999999)).toBe(88184.16);
    expect(roundToPence(43184.159999999996)).toBe(43184.16);
  });
});
