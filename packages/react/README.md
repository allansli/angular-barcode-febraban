# @allansli/react-barcode-febraban

Draw the barcode on a **Brazilian boleto** in React. That barcode is **ITF (Interleaved 2 of 5)**, the symbology **Febraban** uses. `@allansli/react-barcode-febraban` encodes an even-length digit string (usually the 44-digit código de barras) and renders it with `BarcodeInterleaved2of5.ttf`.

It does not convert a 47-digit linha digitável, and it does not compute the módulo-11 DAC. Encoding is [`@allansli/barcode-febraban-core`](../core/README.md). Requires **React 16.8+** (`createElement` only; the GitHub Pages demo uses React 18 `createRoot`).

Sibling packages: [`@allansli/vue-barcode-febraban`](../vue/README.md), [`@allansli/ng-barcode-febraban`](../angular/README.md) (Angular 15+), [`@allansli/angular-barcode-febraban`](../angularjs/README.md) (AngularJS 1.x).

## Install

```bash
npm install @allansli/react-barcode-febraban
```

`@allansli/barcode-febraban-core` is a dependency. React is a peer dependency (`>=16.8.0`).

## Minimal example

```jsx
import BarcodeFebraban from "@allansli/react-barcode-febraban";
import "@allansli/barcode-febraban-core/assets/css/barcode.css";

function App() {
  return <BarcodeFebraban sequence="1234567890" />;
}
```

`sequence` must be a string. A 44-digit código de barras is not safe as a JavaScript number.

## When to use

- The screen is **React 16.8+** and you need a **Brazilian boleto ITF** barcode (Febraban / Interleaved 2 of 5).
- You already have an **even-length digit string** and will draw it with **`BarcodeInterleaved2of5.ttf`**.

## When not to use

- **EAN**, **UPC**, **Code 128**, QR, or any symbology other than ITF.
- You still need to turn a **linha digitável** (47 digits) into a código de barras, or to calculate the **DAC**.
- The app is Vue, Angular, AngularJS, or plain JS — use that package (or `@allansli/barcode-febraban-core`) instead.

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
