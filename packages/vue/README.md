# @allansli/vue-barcode-febraban

Vue 3 component that encodes an even-length digit string for **`BarcodeInterleaved2of5.ttf`**. It is a font encoder, not a Febraban boleto parser (no 47→44 linha digitável conversion, no DAC).

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
  <BarcodeFebraban sequence="1234567890" class="my-barcode" />
</template>

<script setup>
import { BarcodeFebraban } from "@allansli/vue-barcode-febraban";
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
</script>
```

`class` and `style` fall through onto the root element (do not pass `className`).

### As a global plugin

The **default export is the plugin**, so `app.use(...)` works:

```js
import { createApp } from "vue";
import App from "./App.vue";
import BarcodeFebrabanPlugin from "@allansli/vue-barcode-febraban";
import "@allansli/barcode-febraban-core/assets/css/barcode.css";

createApp(App).use(BarcodeFebrabanPlugin).mount("#app");
```

```html
<BarcodeFebraban sequence="1234567890" />
```

The component remains available as a named export: `import { BarcodeFebraban } from "@allansli/vue-barcode-febraban"`.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `sequence` | `string` | `""` | Even-length digit string. Do not pass a JS `number`. |

Invalid input renders as an empty barcode.

## CSS

```js
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
```

The CSS `@font-face` expects a TTF you host yourself; npm does not ship the font.
See [`packages/core/NOTICE`](../core/NOTICE).

## Building the package

```bash
npm run build
```

Produces `dist/index.es.js` (ESM) and `dist/index.cjs.js` (CJS) via Vite.

---

## License

MIT © Allan Martins de Paula (source code). The ITF font in git is not licensed under MIT and is not published to npm.
