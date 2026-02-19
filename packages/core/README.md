# @allansli/barcode-febraban-core

Core pure JavaScript library for generating **ITF (Interleaved 2 of 5)** barcode sequences, compatible with the `BarcodeInterleaved2of5` font. Designed for **Brazilian FEBRABAN banking standards** (boleto bancário).

This is the framework-agnostic core consumed by all framework-specific packages:

| Package | Framework |
|---|---|
| `@allansli/angular-barcode-febraban` | AngularJS (1.x) |
| `@allansli/react-barcode-febraban` | React 18+ |
| `@allansli/vue-barcode-febraban` | Vue 3 |
| `@allansli/ng-barcode-febraban` | Angular (2+) |

---

## Installation

```bash
npm install @allansli/barcode-febraban-core
```

---

## Usage

### ES Module (modern bundlers, Vite, Webpack, Rollup)

```js
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

const sequence = generateBarcodeSequence("1234567890");
console.log(sequence); // "(<RÆÜè)"
```

### CommonJS (Node.js, older bundlers)

```js
const { generateBarcodeSequence } = require("@allansli/barcode-febraban-core");

const sequence = generateBarcodeSequence("1234567890");
```

### Browser (script tag / UMD)

```html
<script src="node_modules/@allansli/barcode-febraban-core/src/index.js"></script>
<script>
  var sequence = barcodeFebrabanCore.generateBarcodeSequence("1234567890");
</script>
```

---

## API

### `generateBarcodeSequence(barcode)`

Converts a numeric string into a font-encoded ITF barcode sequence.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `barcode` | `string` | Numeric string with an **even** number of digits |

**Returns** `string` — Font-encoded sequence wrapped in parentheses, or `""` for invalid input.

**Rules**
- Input must be non-empty
- Input length must be even (digits are processed in pairs)
- Each 2-digit pair maps to a character code:
  - Pairs `00–49` → `charCode = pair + 48`
  - Pairs `50–99` → charCode = `pair + 142`
- Result is wrapped in `(` `)` which the ITF font renders as start/stop bars

**Example**

```js
generateBarcodeSequence("1234567890");
// processes pairs: 12, 34, 56, 78, 90
// → "(<RÆÜè)"
```

---

## CSS & Font

Include the bundled CSS and font to render the barcode visually:

```html
<link rel="stylesheet" href="node_modules/@allansli/barcode-febraban-core/assets/css/barcode.css" />
```

Or in a bundler:

```js
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
```

Then apply the class to the element rendering the sequence:

```html
<div class="barcodei2of5"><!-- sequence goes here --></div>
```

---

## License

MIT © Allan Martins de Paula
