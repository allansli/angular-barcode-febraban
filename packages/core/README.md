# @allansli/barcode-febraban-core

Font encoder for **`BarcodeInterleaved2of5.ttf`**. It turns an even-length string of digits into the character sequence that font renders as an ITF (Interleaved 2 of 5) barcode.

This is **not** a Febraban boleto engine:

| Expectation | This package |
|---|---|
| 44-digit código de barras | Encodes (even length, digits only) |
| 47-digit linha digitável | Returns `""` — there is no conversion |
| DAC (módulo 11) | Not computed or checked |
| Odd length | Returns `""` (no leading-zero pad) |
| Non-digits / non-strings | Returns `""` (does not throw) |

Framework wrappers (`react` / `vue` / `angular` / `angularjs`) call this function and render the same empty output for invalid input.

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
