# @allansli/vue-barcode-febraban

Vue 3 component to render **ITF (Interleaved 2 of 5)** barcodes for Brazilian **FEBRABAN** banking standards (boleto bancário). Uses the `BarcodeInterleaved2of5` font — no images, no SVG.

Powered by [`@allansli/barcode-febraban-core`](../core/README.md).

---

## Installation

```bash
npm install @allansli/vue-barcode-febraban
```

## Usage

### As a local component

```vue
<template>
  <BarcodeFebraban sequence="1234567890" />
</template>

<script setup>
import { BarcodeFebraban } from "@allansli/vue-barcode-febraban";
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
</script>
```

### As a global plugin

```js
import { createApp } from "vue";
import App from "./App.vue";
import { BarcodeFebrabanPlugin } from "@allansli/vue-barcode-febraban";
import "@allansli/barcode-febraban-core/assets/css/barcode.css";

createApp(App).use(BarcodeFebrabanPlugin).mount("#app");
```

```html
<!-- use anywhere in templates -->
<BarcodeFebraban sequence="1234567890" />
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `sequence` | `string \| number` | `""` | Numeric barcode sequence (even number of digits) |
| `className` | `string` | `""` | Additional CSS class names |
| `style` | `object` | `null` | Inline styles for the wrapper element |

---

## CSS

Include the barcode font CSS from the core package:

```js
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
```

---

## Building the package

```bash
npm run build
```

Produces `dist/index.es.js` (ESM) and `dist/index.cjs.js` (CJS) via Vite.

---

## License

MIT © Allan Martins de Paula
