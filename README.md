# HMRC Income Tax

An ultra-fast, tiny TypeScript implementation of common UK Income Tax & National Insurance calculations. See it in action on [SavingTool.co.uk](https://savingtool.co.uk).

This library makes it easy to calculate, based on a PAYE taxable salary:

- Personal Allowance
- Income Tax
- Employee National Insurance Contributions (Class 1, all category letters; defaults to Category A)
- Employer National Insurance Contributions (Class 1, all category letters; defaults to Category A)
- Self-employed National Insurance Contributions (Class 2, Class 3 voluntary, and Class 4)
- Student Loan Repayments (Plans 1, 2, 4, 5 or postgrad)
- Pension annual allowance, including pension tapering
- Corporation Tax (including marginal relief)
- Apprenticeship Levy
- Dividend Tax

Rate data is also provided for VAT.

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
  taxYear: "2025/26",
  cumulativePaye: {
    monthNumber: 1,
    cumulativeGrossIncome: 10_000,
    cumulativeTaxPaid: 0,
  },
});
// Returns: { total: 1790.5, ... } - deduct £1,790.50 from month 1 payslip

// Month 2: No additional income
const month2Tax = calculateIncomeTax({
  taxYear: "2025/26",
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
  taxYear: "2025/26",
  cumulativePaye: {
    monthNumber: 1,
    cumulativeGrossIncome: 60_000,
    cumulativeTaxPaid: 0,
  },
});
// Returns: { total: 16041, ... } - deduct £16,041 from month 1 payslip

// Month 6: Additional £50k earned (£110k total, crossing into PA tapering)
const month6Tax = calculateIncomeTax({
  taxYear: "2025/26",
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

Calculates Class 1 employee National Insurance contributions due in a tax year on an individual's gross employment income, single amount.

Pass gross PAYE employment income. Unlike income tax, NI is not reduced by non-salary-sacrifice pension contributions.

`niCategory` defaults to `"A"` (the standard category for most employees). See [HMRC category letters](https://www.gov.uk/national-insurance-rates-letters/category-letters) for the full list. All standard, freeport, and investment zone category letters are supported.

```typescript
calculateEmployeeNationalInsurance({
  taxYear?: TaxYear,
  country?: Country,
  grossAnnualIncome: number, // gross PAYE employment income, before any non-salary-sacrifice pension deductions
  niCategory?: NICategory    // defaults to "A"
}) => number;
```

Examples of common categories:

| Category | Applies to |
|----------|-----------|
| `"A"` | Most employees (default) |
| `"B"` | Married women/widows with a valid reduced rate election |
| `"C"` | Employees over State Pension age (0% employee NI) |
| `"H"` | Apprentices under 25 |
| `"M"` | Employees under 21 |
| `"J"` | Employees deferring NI because they have another job |

### `calculateEmployerNationalInsurance`

Calculates Class 1 employer National Insurance contributions due in a tax year on an employee's gross employment income.

Pass gross PAYE employment income. Unlike income tax, NI is not reduced by non-salary-sacrifice pension contributions.

`niCategory` defaults to `"A"`. Several categories reduce the employer's liability: categories `H`, `M`, `V`, and `Z` attract 0% employer NI up to the upper earnings limit (£50,270/year), which is the relief for hiring apprentices under 25, employees under 21, and armed forces veterans. Freeport categories (`F`, `I`, `L`, `S`) and investment zone categories (`N`, `E`, `D`, `K`) attract 0% employer NI up to £25,000/year.

```typescript
calculateEmployerNationalInsurance({
  taxYear?: TaxYear,
  country?: Country,
  grossAnnualIncome: number, // gross PAYE employment income, before any non-salary-sacrifice pension deductions
  niCategory?: NICategory    // defaults to "A"
}) => number;
```

### `calculateClass2NationalInsurance`

Returns the annual Class 2 NI liability for a self-employed individual.

From 2024/25 onwards, Class 2 is treated as automatically paid for those with profits above the small profits threshold — so this returns `0` for 2024/25 and later. For 2022/23 and 2023/24, it returns the annual flat-rate amount for those above the threshold.

```typescript
calculateClass2NationalInsurance({
  taxYear?: TaxYear,
  grossAnnualProfit?: number // if omitted, assumes above the small profits threshold
}) => number;
```

### `calculateClass3NationalInsurance`

Returns the annual cost of voluntary Class 3 NI contributions, used to fill gaps in an NI record.

```typescript
calculateClass3NationalInsurance({
  taxYear?: TaxYear
}) => number;
```

### `calculateClass4NationalInsurance`

Calculates Class 4 NI on self-employed trading profits. Class 4 does not count towards state benefits or the state pension.

```typescript
calculateClass4NationalInsurance({
  taxYear?: TaxYear,
  grossAnnualProfit: number
}) => number;
```

### `calculateCorporationTax`

Calculates corporation tax on a company's taxable profits. Applies marginal relief for profits between £50,000 and £250,000 (for tax years from 2023/24 onwards). Assumes a single company with no associated companies — if your company has associated companies, divide the thresholds by the total number of associated companies before comparing to profits.

```typescript
calculateCorporationTax({
  taxYear?: TaxYear,
  profits: number
}) => number;
```

### `calculateApprenticeshipLevy`

Calculates the Apprenticeship Levy payable on an employer's annual pay bill. The levy is 0.5% of the pay bill above the £15,000 annual allowance. Only employers with a pay bill over £3,000,000 will have a levy to pay.

```typescript
calculateApprenticeshipLevy({
  taxYear?: TaxYear,
  annualPayBill: number
}) => number;
```

### `calculateDividendTax`

Calculates dividend tax on dividend income stacked on top of other income. Dividend tax rates and band thresholds are UK-wide (not devolved), so this function does not accept a `country` parameter.

The personal allowance is applied to non-dividend income first. Any unused allowance then applies to dividend income. The dividend allowance is tax-free but still occupies band space, which can push dividends above it into a higher rate band.

```typescript
calculateDividendTax({
  taxYear?: TaxYear,
  nonDividendTaxableIncome: number, // salary, self-employment income, etc.
  dividendIncome: number,
  personalAllowance?: number        // auto-calculated from total income if omitted
}) => DividendTax;

// DividendTax:
// {
//   total: number;
//   breakdown: {
//     basicRateDividendTax: number;    // 8.75%
//     higherRateDividendTax: number;   // 33.75%
//     additionalRateDividendTax: number; // 39.35%
//   }
// }
```

### `calculateStudentLoanRepayments`

Calculates the student loan repayments due in a tax year on an individual's gross employment income, single amount.

Pass gross PAYE employment income. Like NI, student loan repayments are not reduced by non-salary-sacrifice pension contributions.

```typescript
calculateStudentLoanRepayments({
  taxYear?: TaxYear,
  country?: Country,
  grossAnnualIncome: number, // gross PAYE employment income, before any non-salary-sacrifice pension deductions
  studentLoanPlanNo: 1 | 2 | 4 | 5 | 'postgrad'
}) => number;
```

### `getHmrcRates`

Returns an underlying static set of HMRC rates for a given tax year. This is useful for doing your own arbitrary calculations, and also provides access to rate data not exposed via dedicated functions (VAT rates).

```typescript
getHmrcRates({
  taxYear?: TaxYear,
  country?: Country
}) => EnglishTaxRates | ScottishTaxRates;
```

Notable rate fields available via `getHmrcRates`:

| Field | Description |
|---|---|
| `DIVIDEND_ALLOWANCE` | Annual dividend allowance (£500 for 2024/25+) |
| `DIVIDEND_BASIC_RATE` | Dividend tax rate for basic rate taxpayers (8.75%) |
| `DIVIDEND_HIGHER_RATE` | Dividend tax rate for higher rate taxpayers (33.75%) |
| `DIVIDEND_ADDITIONAL_RATE` | Dividend tax rate for additional rate taxpayers (39.35%) |
| `VAT_STANDARD_RATE` | Standard VAT rate (20%) |
| `VAT_REDUCED_RATE` | Reduced VAT rate (5%) |
| `VAT_REGISTRATION_THRESHOLD` | Annual turnover threshold for VAT registration |
| `EMPLOYER_NI_RATE` | Employer NI rate above the secondary threshold |
| `EMPLOYER_NI_SECONDARY_THRESHOLD` | Weekly secondary threshold for employer NI |

**Note on VAT calculations:** A `calculateVat` function is intentionally out of scope for this library. VAT involves too many situational factors (exempt vs zero-rated vs reduced-rate supplies, partial exemption, flat-rate scheme, margin scheme, etc.) for a single function to be correct in the general case without a richer input model. The rate and threshold data above is provided so consumers can apply the relevant rate for their specific situation.

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
  annualAllowanceCarryForward?: number; // Total unused allowance carried forward from the previous 3 tax years
}) => {
    adjustedIncome: number;
    thresholdIncome: number;
    reduction: number;
    allowance: number;          // Current tax year's allowance after any tapering
    carryForward: number;       // Carry forward applied (equals annualAllowanceCarryForward input, or 0)
    availableAllowance: number; // Total available allowance: allowance + carryForward
};
```

`annualAllowanceCarryForward` is the sum of unused allowance from up to the previous 3 tax years. You must have been a member of a registered pension scheme in each year you wish to carry forward from. If a prior year was tapered, that year's tapered allowance (not the standard allowance) determines how much unused allowance is available to carry forward.

Note that this implementation does not yet support the following:

- Accounting for DB (Defined Benefit) pensions
- Paying into overseas pensions

## Examples (2025/26 HMRC Rates)

Mark S. of MDR earns £55,000. His employer contributes 6% to his pension, but also matches up to another 2%. Mark contributes 2% via salary sacrafice to get the matching. Therefore, Mark's taxable income is £53,900. He has £19,000 of outstanding student loan debt, and is on Plan 1.

```javascript
import {
  calculatePersonalAllowance,
  calculateIncomeTax,
  calculateEmployeeNationalInsurance,
  calculateStudentLoanRepayments,
} from "@saving-tool/hmrc-income-tax";

const taxYear = "2025/26";

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
// => 3088.32

const studentLoanRepayments = calculateStudentLoanRepayments({
  taxableAnnualIncome,
  studentLoanPlanNo: 1,
  taxYear,
});
// => 2506.32

// Do whatever you want, e.g. calculate the take-home pay
const takeHome =
  taxableAnnualIncome -
  total -
  nationalInsuranceContributions -
  studentLoanRepayments;
// => 39313.36
```

Irv B. of MDR earns £160,000. His employer contributes some amount to his pension, but he contributes nothing. He has no student loan.

```javascript
import {
  calculatePersonalAllowance,
  calculateIncomeTax,
  calculateEmployeeNationalInsurance,
} from "@saving-tool/hmrc-income-tax";

const taxYear = "2025/26";

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
// => 58203

const nationalInsuranceContributions = calculateEmployeeNationalInsurance({
  taxableAnnualIncome,
  taxYear,
});
// => 5210.32

// Do whatever you want, e.g. calculate the take-home pay
const takeHome =
  taxableAnnualIncome - total - nationalInsuranceContributions;
// => 96586.68
```

It's important to understand that in most cases this library is expecting _taxable_ income (appropriate API naming aims to make this clear). Any salary sacrafice mechanisms should be applied before these calculations, and the appropriate taxable amount used when calling this library.

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
