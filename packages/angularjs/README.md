# @allansli/angular-barcode-febraban

AngularJS (1.x) directive to render **ITF (Interleaved 2 of 5)** barcodes for Brazilian **FEBRABAN** banking standards (boleto bancário). Uses the `BarcodeInterleaved2of5` font — no images, no HTTP requests.

Powered by [`@allansli/barcode-febraban-core`](../core/README.md).

---

## Installation

```bash
npm install @allansli/angular-barcode-febraban
```

## Setup

**1. Include scripts and styles**

```html
<script src="node_modules/@allansli/angular-barcode-febraban/dist/angular-barcode-febraban.min.js"></script>
<link rel="stylesheet" href="node_modules/@allansli/angular-barcode-febraban/dist/css/barcode.css" />
```

**2. Add the module to your app**

```javascript
angular.module("myApp", ["angular-barcode-febraban"]);
```

**3. Use the directive**

```html
<ng-barcode-febraban barcode-sequence="1234567890"></ng-barcode-febraban>
```

Dynamic binding:

```html
<ng-barcode-febraban barcode-sequence="{{vm.sequence}}"></ng-barcode-febraban>
```

---

## Directive

| Attribute | Type | Description |
|---|---|---|
| `barcode-sequence` | string (numeric) | Even-length numeric string to render as barcode |

**Validation:** Non-numeric values or odd-length strings render as an empty barcode.

---

## Building from source

```bash
npm install
npm run build   # runs gulp deploy
```

## Running tests

```bash
npm test
```

---

## License

MIT © Allan Martins de Paula
