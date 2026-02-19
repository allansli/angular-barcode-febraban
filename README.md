# barcode-febraban

Monorepo for **ITF (Interleaved 2 of 5)** barcode libraries targeting multiple frontend frameworks — built for Brazilian **FEBRABAN** banking standards (boleto bancário).

The barcode is rendered as text using the `BarcodeInterleaved2of5` font: **no images, no HTTP requests, no SVG**.

---

## Packages

| Package | Version | Description |
|---|---|---|
| [`@allansli/barcode-febraban-core`](packages/core/README.md) | core | Pure JS library — framework-agnostic |
| [`@allansli/angular-barcode-febraban`](packages/angularjs/README.md) | 1.1.0 | AngularJS (1.x) directive |
| [`@allansli/react-barcode-febraban`](packages/react/README.md) | 1.0.0 | React 18+ component |
| [`@allansli/vue-barcode-febraban`](packages/vue/README.md) | 1.0.0 | Vue 3 component |
| [`@allansli/ng-barcode-febraban`](packages/angular/README.md) | 1.0.0 | Angular (2+) component |

All framework packages consume `@allansli/barcode-febraban-core` as their engine.

---

## Architecture

```
barcode-febraban (monorepo)
│
├── packages/core           @allansli/barcode-febraban-core
│   └── src/
│       ├── index.js        UMD/CJS — works in browser globals, Node, AMD
│       └── index.esm.js    ESM — for modern bundlers (Vite, Webpack, Rollup)
│
├── packages/angularjs      @allansli/angular-barcode-febraban
│   └── src/
│       ├── *.module.js     AngularJS module definition
│       ├── *.utils.js      Angular constant — delegates to core
│       └── *.directive.js  <ng-barcode-febraban> element directive
│
├── packages/react          @allansli/react-barcode-febraban
│   └── src/
│       └── BarcodeFebraban.jsx
│
├── packages/vue            @allansli/vue-barcode-febraban
│   └── src/
│       └── BarcodeFebraban.vue
│
└── packages/angular        @allansli/ng-barcode-febraban
    └── src/
        ├── barcode-febraban.component.ts
        └── barcode-febraban.module.ts
```

---

## Quick start

### Core (pure JS)

```bash
npm install @allansli/barcode-febraban-core
```

```js
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";
const sequence = generateBarcodeSequence("1234567890");
```

### AngularJS (1.x)

```bash
npm install @allansli/angular-barcode-febraban
```

```html
<ng-barcode-febraban barcode-sequence="1234567890"></ng-barcode-febraban>
```

### React

```bash
npm install @allansli/react-barcode-febraban
```

```jsx
import BarcodeFebraban from "@allansli/react-barcode-febraban";
<BarcodeFebraban sequence="1234567890" />
```

### Vue 3

```bash
npm install @allansli/vue-barcode-febraban
```

```vue
<BarcodeFebraban sequence="1234567890" />
```

### Angular (2+)

```bash
npm install @allansli/ng-barcode-febraban
```

```html
<barcode-febraban sequence="1234567890"></barcode-febraban>
```

---

## Development

This is an **npm workspaces** monorepo.

```bash
# Install all dependencies
npm install

# Build all packages
npm run build:all

# Test all packages
npm run test:all
```

---

## Publishing

The `scripts/publish-all.js` script streamlines publishing all packages to npm in the correct dependency order (core first).

```bash
# Dry run — see what would be published
npm run publish:dry-run

# Publish all packages
npm run publish:all

# Publish with a dist-tag (e.g., for pre-releases)
node scripts/publish-all.js --tag next

# Publish specific packages only
node scripts/publish-all.js core react

# All options
node scripts/publish-all.js [--dry-run] [--tag <tag>] [package-key ...]
```

Package keys: `core`, `angularjs`, `react`, `vue`, `angular`.

---

## License

MIT © Allan Martins de Paula
