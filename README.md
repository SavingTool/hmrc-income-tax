# HMRC Income Tax

A TypeScript implementation of UK Income Tax & National Insurance calculations. See it in action on [SavingTool.co.uk](https://savingtool.co.uk).

Multiple versions of the HMRC rates can be supported, although only 2022/23 has been implemented (see `src/hmrc.ts`).

## Installation

`yarn add @saving-tool/hmrc-income-tax` (or `npm install @saving-tool/hmrc-income-tax`)

## Usage

There are 4 functions exposed:

- `calculatePersonalAllowance`: calculates an individual's personal allowance for a tax year, single amount.
- `calculateIncomeTax`: calculates the income tax due in a tax year on an individual's taxable income, broken down into the 3 bands (basic, higher, additional)
- `calculateEmployeeNationalInsurance`: calculates the national insurance contributions due in a tax year on an individual's taxable income, single amount. Note: only supports class 1, category A
- `calculateStudentLoanRepayments`: calculates the student loan repayments due in a tax year on an individual's taxable income, single amount.

All APIs return raw amounts and there is no formatting or display functionality.

## Examples (2022/23 HMRC Rates)

Mark S. of MDR earns £55,000. His employer contributes 6% to his pension, but also matches up to another 2%. Mark contributes 2% via salary sacrafice to get the matching. Therefore, Mark's taxable income is £53,900. He has £19,000 of outstanding student loan debt, and is on Plan 1.

```javascript
// Mark S.
const taxableAnnualIncome = 53_900
const personalAllowance = calculatePersonalAllowance({ taxableAnnualIncome }); // => 12570
const incomeTax = calculateIncomeTax({ personalAllowance, taxableAnnualIncome });
const { basicRateTax, higherRateTax, additionalRateTax } = incomeTax;
const totalIncomeTax = basicRateTax + higherRateTax + additionalRateTax; // => 8992
const nationalInsuranceContributions = calculateEmployeeNationalInsurance({ taxableAnnualIncome }); // => 5471
const studentLoanRepayments = calculateStudentLoanRepayments({ taxableAnnualIncome, studentLoanPlanNo: 1 }); // => 3162

// Do whatever you want, e.g. calculate the take-home pay
const takeHome = taxableAnnualIncome - totalIncomeTax - nationalInsuranceContributions - studentLoanRepayments; // => 36275
```


Irv B. of MDR earns £160,000. His employer contributes some amount to his pension, but he contributes nothing. He has no student loan.

```javascript
// Irv B.
const taxableAnnualIncome = 160_000
const personalAllowance = calculatePersonalAllowance({ taxableAnnualIncome }); // => 0
const incomeTax = calculateIncomeTax({ personalAllowance, taxableAnnualIncome });
const { basicRateTax, higherRateTax, additionalRateTax } = incomeTax;
const totalIncomeTax = basicRateTax + higherRateTax + additionalRateTax; // => 57589
const nationalInsuranceContributions = calculateEmployeeNationalInsurance({ taxableAnnualIncome }); // => 8919

// Do whatever you want, e.g. calculate the take-home pay
const takeHome = taxableAnnualIncome - totalIncomeTax - nationalInsuranceContributions; // => 93492
```


It's important to understand that in most cases this library is expecting *taxable* income (appropriate API naming aims to make this clear). Any salary sacrafice mechanisms should be applied before these calculations, and the appropriate taxable amount used when calling this library.


## Formatting and rounding output

A formatter/rounder function is not included as to separate that concern from the raw tax calculations. Your application may want to apply it's own rounding and formatting logic.

Example roll-your-own formatter using the `Intl` API (similar to what [SavingTool.co.uk](https://savingtool.co.uk) uses):

```javascript
const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Rounds an amount of GBP to the nearest pound and formats it
// `amount` can be a long number e.g. 548.729345847 => £549
export const roundAndFormatGbp = (amount: number) => {
  return formatGbp(Math.round(amount));
};

```