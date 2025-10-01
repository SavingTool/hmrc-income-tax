# HMRC Income Tax

An ultra-fast, tiny TypeScript implementation of common UK Income Tax & National Insurance calculations. See it in action on [SavingTool.co.uk](https://savingtool.co.uk).

This library makes it easy to calculate, based on a PAYE taxable salary:

- Personal Allowance
- Income Tax
- Employee National Insurance Contributions (Class 1, Category A only)
- Student Loan Repayments (Plans 1, 2, 4, 5 or postgrad)
- Pension annual allowance, including pension tapering

Multiple versions of the HMRC rates can be supported, although only the follwing years have been implemented:

England/NI/Wales:

- 2025/26 (default)
- 2024/25
- 2023/24
- 2022/23

Scotland:

- 2025/26 (default)
- 2024/25

Works in all modern browsers and Node.js (LTS recommended).

**Precision**: All calculations return values rounded to 1p (2 decimal places) following [HMRC's official guidance](https://www.gov.uk/government/publications/cwg2-further-guide-to-paye-and-national-insurance-contributions/2023-to-2024-employer-further-guide-to-paye-and-national-insurance-contributions#sec1). A `roundToPence()` utility function is also exported for custom calculations.

## Installation

Run: `yarn add @saving-tool/hmrc-income-tax` (or `npm install @saving-tool/hmrc-income-tax`)

## Usage

`country` is an optional input for all APIs: `"England/NI/Wales" | "Scotland"`. If not provided, the default is `"England/NI/Wales"`.

Note that `taxYear` is an optional input to select which tax year rates should be used (default is "2025/26").

### `calculatePersonalAllowance`

Calculates an individual's personal allowance for a tax year, single amount.

```typescript
calculatePersonalAllowance({
  taxYear?: TaxYear,
  country?: Country,
  taxableAnnualIncome: number
}) => number;
```

### `calculateIncomeTax`

Calculates the income tax due in a tax year on an individual's taxable income

```typescript
calculateIncomeTax({
  taxYear?: TaxYear;
  country?: Country,
  personalAllowance?: number,
  taxableAnnualIncome?: number
}) => EnglishIncomeTax | ScottishIncomeTax;
```

**New in v1.3.0:** Cumulative PAYE Mode

For variable monthly income scenarios (e.g., NHS workers with variable pay), you can now use cumulative PAYE calculation mode:

```typescript
calculateIncomeTax({
  taxYear?: TaxYear;
  country?: Country,
  personalAllowance?: number, // Optional: if provided, uses this value; otherwise auto-calculates with tapering
  cumulativePaye: {
    monthNumber: number; // 1-12, which month of the tax year
    cumulativeGrossIncome: number; // Total gross income to date in the tax year
    cumulativeTaxPaid: number; // Total tax already paid to date in the tax year
  }
}) => EnglishIncomeTax | ScottishIncomeTax;
```

**Important**: In cumulative PAYE mode, the function returns the **tax due for that specific month only**, not the total cumulative tax. This represents what should be deducted from the current month's payslip.

**Example 1**: £10,000 income in month 1, then £0 for rest of year

```typescript
// Month 1: £10,000 gross income
const month1Tax = calculateIncomeTax({
  taxYear: "2024/25",
  cumulativePaye: {
    monthNumber: 1,
    cumulativeGrossIncome: 10_000,
    cumulativeTaxPaid: 0,
  },
});
// Returns: { total: 1790.5, ... } - deduct £1,790.50 from month 1 payslip

// Month 2: No additional income
const month2Tax = calculateIncomeTax({
  taxYear: "2024/25",
  cumulativePaye: {
    monthNumber: 2,
    cumulativeGrossIncome: 10_000, // Still £10k total
    cumulativeTaxPaid: 1790.5, // Tax paid in month 1
  },
});
// Returns: { total: 0, ... } - deduct £0 from month 2 payslip (no tax due this month)
```

**Example 2**: Variable high income with personal allowance tapering

```typescript
// Month 1: £60,000 gross income
const month1Tax = calculateIncomeTax({
  taxYear: "2024/25",
  cumulativePaye: {
    monthNumber: 1,
    cumulativeGrossIncome: 60_000,
    cumulativeTaxPaid: 0,
  },
});
// Returns: { total: 16041, ... } - deduct £16,041 from month 1 payslip

// Month 6: Additional £50k earned (£110k total, crossing into PA tapering)
const month6Tax = calculateIncomeTax({
  taxYear: "2024/25",
  cumulativePaye: {
    monthNumber: 6,
    cumulativeGrossIncome: 110_000, // £60k + £50k
    cumulativeTaxPaid: 16041, // Tax paid in month 1
  },
});
// Returns: { total: 17391, ... } - deduct £17,391 from month 6 payslip
```

This cumulative mode implements HMRC PAYE rules where personal allowances are pro-rated monthly and handles high earner tapering, avoiding the over-taxation that occurs when simply annualizing variable monthly income.

### `calculateEmployeeNationalInsurance`

Calculates the National Insurance contributions due in a tax year on an individual's taxable income, single amount. Note: only supports class 1, category A.

```typescript
calculateEmployeeNationalInsurance({
  taxYear?: TaxYear,
  country?: Country,
  taxableAnnualIncome: number
}) => number;
```

### `calculateStudentLoanRepayments`

Calculates the student loan repayments due in a tax year on an individual's taxable income, single amount.

```typescript
calculateStudentLoanRepayments({
  taxYear?: TaxYear,
  country?: Country,
  taxableAnnualIncome: number,
  studentLoanPlanNo: 1 | 2 | 4 | 5 | 'postgrad'
}) => number;
```

### `getHmrcRates`

Returns an underlying static set of HMRC rates for a given tax year. This is useful for doing your own arbitrary calculations.

```typescript
getHmrcRates({
  taxYear?: TaxYear,
  country?: Country
}) => EnglishTaxRates | ScottishTaxRates;
```

### `calculatePensionAnnualAllowance`

Returns an object containing an annual allowance information for pension contributions.
Note that pension tapering calculations are quite complex. You can also refer to the tests with various examples.

"Personally paid" pension contributions means you paid from your bank account direct to a pension i.e. not through work.

For employee pension contributions:

- Use `employeeDcPensionContributions` for salary sacrifice contributions (post-2015 schemes\*)
- Use `retrospectivePensionPaymentsTaxRelief` for salary sacrifice contributions (pre-2015 schemes\*)
- Use `retrospectivePensionPaymentsTaxRelief` for personally paid or other relief-at-source contributions

\* The rules changed for salary sacrifice schemes set up on or after 9th July 2015

```typescript
calculatePensionAnnualAllowance({
  taxYear?: TaxYear;
  totalAnnualIncome: number; // Note: include any salary sacrificed income, plus investent income, but do not include employer contributions, or relief-at-source contributions such as ones personally paid
  retrospectivePensionPaymentsTaxRelief?: number; // Relief-at-source pension contributions such as ones personally paid
  employeeDcPensionContributions?: number;
  employerDcPensionContributions?: number;
  lumpSumDeathBenefits?: number;
}) => {
    adjustedIncome: number;
    thresholdIncome: number;
    reduction: number;
    allowance: number;
};
```

Note that this implementation does not yet support the following:

- Use of carry-forward from previous years' allowances
- Accounting for DB (Defined Benefit) pensions
- Paying into overseas pensions

## Examples (2022/23 HMRC Rates)

**DISCLAIMER:** These examples were written against the 2022/23 England/Wales/NI HMRC rates, hence will output different results vs today's HMRC rates.

Mark S. of MDR earns £55,000. His employer contributes 6% to his pension, but also matches up to another 2%. Mark contributes 2% via salary sacrafice to get the matching. Therefore, Mark's taxable income is £53,900. He has £19,000 of outstanding student loan debt, and is on Plan 1.

```javascript
import {
  calculatePersonalAllowance,
  calculateIncomeTax,
  calculateEmployeeNationalInsurance,
  calculateStudentLoanRepayments,
} from "@saving-tool/hmrc-income-tax";

const taxYear = "2022/23";

// Mark S.
const taxableAnnualIncome = 53_900;

const personalAllowance = calculatePersonalAllowance({
  taxableAnnualIncome,
  taxYear,
});
// => 12570

const incomeTax = calculateIncomeTax({
  personalAllowance,
  taxableAnnualIncome,
  taxYear,
});
const { total } = incomeTax;
// => 8992

const nationalInsuranceContributions = calculateEmployeeNationalInsurance({
  taxableAnnualIncome,
  taxYear,
});
// => 5471

const studentLoanRepayments = calculateStudentLoanRepayments({
  taxableAnnualIncome,
  studentLoanPlanNo: 1,
  taxYear,
});
// => 3162

// Do whatever you want, e.g. calculate the take-home pay
const takeHome =
  taxableAnnualIncome -
  totalIncomeTax -
  nationalInsuranceContributions -
  studentLoanRepayments;
// => 36275
```

Irv B. of MDR earns £160,000. His employer contributes some amount to his pension, but he contributes nothing. He has no student loan.

```javascript
import {
  calculatePersonalAllowance,
  calculateIncomeTax,
  calculateEmployeeNationalInsurance,
} from "@saving-tool/hmrc-income-tax";

const taxYear = "2022/23";

// Irv B.
const taxableAnnualIncome = 160_000;

const personalAllowance = calculatePersonalAllowance({
  taxableAnnualIncome,
  taxYear,
});
// => 0

const incomeTax = calculateIncomeTax({
  personalAllowance,
  taxableAnnualIncome,
  taxYear,
});
const { total } = incomeTax;
// => 57589

const nationalInsuranceContributions = calculateEmployeeNationalInsurance({
  taxableAnnualIncome,
  taxYear,
});
// => 8919

// Do whatever you want, e.g. calculate the take-home pay
const takeHome =
  taxableAnnualIncome - totalIncomeTax - nationalInsuranceContributions;
// => 93492
```

It's important to understand that in most cases this library is expecting _taxable_ income (appropriate API naming aims to make this clear). Any salary sacrafice mechanisms should be applied before these calculations, and the appropriate taxable amount used when calling this library.

## Formatting and rounding output

All calculation functions return values rounded to 1p precision (2 decimal places), following HMRC standards. If you need to format values for display (e.g., rounding to whole pounds or adding currency symbols), you can apply your own formatting logic.

Example formatter using the `Intl` API to round to nearest pound (similar to what [SavingTool.co.uk](https://savingtool.co.uk) uses):

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
