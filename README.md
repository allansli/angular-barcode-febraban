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
barcode-febraban (npm workspaces monorepo)
│
├── packages/core           @allansli/barcode-febraban-core
├── packages/angularjs      @allansli/angular-barcode-febraban
├── packages/react          @allansli/react-barcode-febraban
├── packages/vue            @allansli/vue-barcode-febraban
├── packages/angular        @allansli/ng-barcode-febraban
└── demo/                   GitHub Pages demos (framework CDNs, pinned)
```

The published libraries live only under `packages/`. There is no parallel
AngularJS product at the repository root.

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

## Font

`BarcodeInterleaved2of5.ttf` stays in git for demos. It is **excluded from npm**.
Name table: “Code 2/5 Interleaved”, Copyright 2000, version 1.00 (21 Jun 2000).
No license grant. A nearby Chaos Microsystems shareware family (1999) is
documented at https://luc.devroye.org/fonts-29893.html — **not confirmed to be
this file**, and not a MIT grant. See [NOTICE](./NOTICE).

---

## License

MIT © Allan Martins de Paula (source code only).
