# barcode-febraban

Monorepo of **font encoders** for `BarcodeInterleaved2of5.ttf`. Each package turns an even-length digit string into the character sequence that font renders as an ITF (Interleaved 2 of 5) barcode.

This is **not** a Febraban boleto engine: there is no 47-digit linha digitável → 44-digit código de barras conversion, and no módulo-11 DAC.

---

## Packages

| Package | Version | Description |
|---|---|---|
| [`@allansli/barcode-febraban-core`](packages/core/README.md) | core | Pure JS encoder — framework-agnostic |
| [`@allansli/angular-barcode-febraban`](packages/angularjs/README.md) | 1.1.0 | AngularJS (1.x) directive |
| [`@allansli/react-barcode-febraban`](packages/react/README.md) | 1.0.0 | React 16.8+ component |
| [`@allansli/vue-barcode-febraban`](packages/vue/README.md) | 1.0.0 | Vue 3 component |
| [`@allansli/ng-barcode-febraban`](packages/angular/README.md) | 1.0.0 | Angular 15+ standalone component |

All framework packages consume `@allansli/barcode-febraban-core`.

---

## Architecture

```
barcode-febraban (monorepo)
│
├── packages/core           @allansli/barcode-febraban-core
│   └── src/
│       ├── generate-barcode-sequence.js  shared encoder
│       ├── index.js        UMD/CJS
│       └── index.esm.js    ESM re-export of the shared encoder
│
├── packages/angularjs      @allansli/angular-barcode-febraban
├── packages/react          @allansli/react-barcode-febraban
├── packages/vue            @allansli/vue-barcode-febraban
└── packages/angular        @allansli/ng-barcode-febraban
```

---

## Quick start

Pass a **string** of digits with even length (a 44-digit código de barras is fine). A 47-digit linha digitável returns an empty barcode.

```js
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";
const sequence = generateBarcodeSequence("1234567890");
```

See each package README for framework usage.

---

## Development

This is an **npm workspaces** monorepo.

```bash
npm install
npm run build:all
npm run test:all
```

---

## Publishing

`scripts/publish-all.js` publishes in dependency order (core first) and **aborts if core fails**. Angular is published from ng-packagr `dist/`. On GitHub Actions the script adds `--provenance`, matching the per-package workflows.

```bash
npm run publish:dry-run
npm run publish:all
```

Do not use this to publish from a pull request. Releases are tagged `core@v*`, `react@v*`, `vue@v*`, `angular@v*`, `angularjs@v*`.

---

## Font license

`BarcodeInterleaved2of5.ttf` is bundled for historical compatibility. **MIT does not cover the font.** See [NOTICE](./NOTICE).

---

## License

MIT © Allan Martins de Paula (source code only).
