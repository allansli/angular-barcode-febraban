# @allansli/barcode-febraban-core

Draw the barcode on a **Brazilian boleto**. That barcode is **ITF (Interleaved 2 of 5)**, the symbology **Febraban** uses for the código de barras. `@allansli/barcode-febraban-core` is the vanilla JavaScript encoder: it turns an even-length digit string into the character sequence that `BarcodeInterleaved2of5.ttf` renders as the bars.

Pass digits you already have (the 44-digit código de barras is the usual input). This package does not parse a boleto, does not convert a 47-digit linha digitável into 44 digits, and does not compute the módulo-11 DAC.

The framework packages call this function:

- [`@allansli/angular-barcode-febraban`](../angularjs/README.md) — AngularJS 1.x
- [`@allansli/react-barcode-febraban`](../react/README.md) — React
- [`@allansli/vue-barcode-febraban`](../vue/README.md) — Vue 3
- [`@allansli/ng-barcode-febraban`](../angular/README.md) — Angular 15+

## Install

```bash
npm install @allansli/barcode-febraban-core
```

## Minimal example

```js
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

const sequence = generateBarcodeSequence("1234567890");
console.log(sequence); // "(<RÆÜè)"
```

Put `sequence` in an element with class `barcodei2of5` after loading `assets/css/barcode.css`. Host `BarcodeInterleaved2of5.ttf` yourself; npm does not ship the font.

## When to use

- You need an **ITF (Interleaved 2 of 5)** barcode for a **Brazilian boleto** (Febraban código de barras).
- The input is a **string of digits with even length**. A 44-digit código de barras qualifies.
- You want **vanilla JS** (ESM, CommonJS, or a browser script) and will render with **`BarcodeInterleaved2of5.ttf`**.

## When not to use

- **EAN**, **UPC**, **Code 128**, QR, or any symbology other than ITF.
- You have a **47-digit linha digitável** and need it converted. Odd length returns `""`. There is no 47→44 conversion.
- You need the **DAC (módulo 11)** computed or checked.
- You need a canvas or SVG barcode that does not use this font.
- You want a component: use the React, Vue, Angular, or AngularJS package instead of calling this from a template by hand.

| Expectation | This package |
|---|---|
| 44-digit código de barras | Encodes (even length, digits only) |
| 47-digit linha digitável | Returns `""` — there is no conversion |
| DAC (módulo 11) | Not computed or checked |
| Odd length | Returns `""` (no leading-zero pad) |
| Non-digits / non-strings | Returns `""` (does not throw) |

---

## Other entry points

The minimal example is ESM (Vite, Webpack, Rollup). CommonJS and a browser script use the same function.

### CommonJS (Node.js, older bundlers)

```js
const { generateBarcodeSequence } = require("@allansli/barcode-febraban-core");

const sequence = generateBarcodeSequence("1234567890");
```

### Browser (script tag)

```html
<script src="node_modules/@allansli/barcode-febraban-core/src/generate-barcode-sequence.js"></script>
<script>
  var sequence = barcodeFebrabanCore.generateBarcodeSequence("1234567890");
</script>
```

The UMD entry `src/index.js` also works in Node/AMD. In a browser it expects the encoder script above (or a bundle that concatenates both).

---

## API

### `generateBarcodeSequence(barcode)`

**Parameters**

| Name | Type | Description |
|---|---|---|
| `barcode` | `string` | Digits only, **even** length |

**Returns** `string` — Font-encoded sequence wrapped in parentheses, or `""` for invalid input (including `null`, numbers, odd length, and 47-digit linha digitável).

**Encoding** (for this font, not a generic ITF bit pattern):

- Pairs `00–49` → `charCode = pair + 48`
- Pairs `50–99` → `charCode = pair + 142`
- Result wrapped in `(` `)` for the font’s start/stop bars

```js
generateBarcodeSequence("1234567890");
// pairs: 12, 34, 56, 78, 90 → "(<RÆÜè)"

generateBarcodeSequence("0".repeat(47)); // linha digitável length
// ""
```

---

## CSS & Font

Published npm packages include the CSS only. They do **not** include
`BarcodeInterleaved2of5.ttf` (no redistributable license; see [NOTICE](./NOTICE)).

The CSS still references the historical relative path:

```css
@font-face {
  font-family: "BarcodeInterleaved2of5";
  src: url("../fonts/BarcodeInterleaved2of5.ttf") format("truetype");
}
```

Host a copy of that file (from this git tree for local demos, or a font you
are licensed to use) at `fonts/BarcodeInterleaved2of5.ttf` next to `css/`,
or override `@font-face` in your app.

```html
<link rel="stylesheet" href="node_modules/@allansli/barcode-febraban-core/assets/css/barcode.css" />
```

Or in a bundler:

```js
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
```

```html
<div class="barcodei2of5"><!-- sequence goes here --></div>
```

GitHub Pages demos load the TTF from `packages/core/assets/fonts/` in this repo.

---

## License

MIT © Allan Martins de Paula (source code). The TrueType font in git is **not**
covered by MIT and is **not** published to npm; see [NOTICE](./NOTICE).
