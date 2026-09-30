# @allansli/vue-barcode-febraban

Draw the barcode on a **Brazilian boleto** in Vue 3. That barcode is **ITF (Interleaved 2 of 5)**, the symbology **Febraban** uses. `@allansli/vue-barcode-febraban` encodes an even-length digit string (usually the 44-digit código de barras) and renders it with `BarcodeInterleaved2of5.ttf`.

It does not convert a 47-digit linha digitável, and it does not compute the módulo-11 DAC. Encoding is [`@allansli/barcode-febraban-core`](../core/README.md). Peer dependency: `vue` `>=3.0.0` (not Vue 2).

Sibling packages: [`@allansli/react-barcode-febraban`](../react/README.md), [`@allansli/ng-barcode-febraban`](../angular/README.md) (Angular 15+), [`@allansli/angular-barcode-febraban`](../angularjs/README.md) (AngularJS 1.x).

## Install

```bash
npm install @allansli/vue-barcode-febraban
```

## Minimal example

```vue
<template>
  <BarcodeFebraban sequence="1234567890" class="my-barcode" />
</template>

<script setup>
import { BarcodeFebraban } from "@allansli/vue-barcode-febraban";
import "@allansli/barcode-febraban-core/assets/css/barcode.css";
</script>
```

`sequence` must be a string of digits with even length. `class` and `style` fall through onto the root element (do not pass `className`).

## When to use

- The screen is **Vue 3** and you need a **Brazilian boleto ITF** barcode (Febraban / Interleaved 2 of 5).
- You already have an **even-length digit string** and will draw it with **`BarcodeInterleaved2of5.ttf`**.

## When not to use

- **EAN**, **UPC**, **Code 128**, QR, or any symbology other than ITF.
- You still need to turn a **linha digitável** (47 digits) into a código de barras, or to calculate the **DAC**.
- The app is Vue 2, React, Angular, AngularJS, or plain JS — use that package (or `@allansli/barcode-febraban-core`) instead.

## Global plugin

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
