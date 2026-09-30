# @allansli/react-barcode-febraban

React component that encodes an even-length digit string for **`BarcodeInterleaved2of5.ttf`**. It is a font encoder, not a Febraban boleto parser (no 47→44 linha digitável conversion, no DAC).

Requires **React 16.8+** (`createElement` only; the GitHub Pages demo uses React 18 `createRoot`). Powered by [`@allansli/barcode-febraban-core`](../core/README.md).

---

## Installation

```bash
npm install @allansli/react-barcode-febraban
```

## Usage

```jsx
import BarcodeFebraban from "@allansli/react-barcode-febraban";
import "@allansli/barcode-febraban-core/assets/css/barcode.css";

function App() {
  return <BarcodeFebraban sequence="1234567890" />;
}
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `sequence` | `string` | yes | Even-length digit string. Do not pass a JS `number` (44-digit values are not safe as floats). |
| `className` | `string` | no | Additional CSS class names for the wrapper div |
| `style` | `object` | no | Inline styles for the wrapper div |

Invalid input (odd length, non-digits, empty, 47-digit linha digitável) renders as an empty barcode.

## CSS

```js
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
```

The CSS `@font-face` expects `BarcodeInterleaved2of5.ttf` next to the stylesheet
(`../fonts/`). npm does **not** ship that file. Host a copy from git for demos,
or a font you are licensed to use. See [`packages/core/NOTICE`](../core/NOTICE).

## Building the package

```bash
npm run build
```

Produces `dist/index.esm.js` (ESM) and `dist/index.cjs.js` (CJS) from the JSX source via Rollup.

---

## License

MIT © Allan Martins de Paula (source code). The ITF font in git is not licensed under MIT and is not published to npm.
