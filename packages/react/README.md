# @allansli/react-barcode-febraban

React component to render **ITF (Interleaved 2 of 5)** barcodes for Brazilian **FEBRABAN** banking standards (boleto bancário). Uses the `BarcodeInterleaved2of5` font — no images, no SVG.

Powered by [`@allansli/barcode-febraban-core`](../core/README.md).

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
| `sequence` | `string \| number` | yes | Numeric barcode sequence (even number of digits) |
| `className` | `string` | no | Additional CSS class names for the wrapper div |
| `style` | `object` | no | Inline styles for the wrapper div |

**Validation:** Invalid or odd-length sequences render as an empty barcode.

## CSS

The component renders a `<div class="barcodei2of5">`. Include the CSS from the core package to apply the barcode font:

```js
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
```

Or link the stylesheet manually in your HTML:

```html
<link rel="stylesheet" href="node_modules/@allansli/barcode-febraban-core/assets/css/barcode.css" />
```

## Building the package

```bash
npm run build
```

Produces `dist/index.esm.js` (ESM) from the JSX source via Rollup.

---

## License

MIT © Allan Martins de Paula
