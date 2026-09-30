# @allansli/angular-barcode-febraban

Draw the barcode on a **Brazilian boleto** in AngularJS 1.x. That barcode is **ITF (Interleaved 2 of 5)**, the symbology **Febraban** uses. `@allansli/angular-barcode-febraban` is a directive: it encodes an even-length digit string (usually the 44-digit código de barras) and renders it with `BarcodeInterleaved2of5.ttf`.

It does not convert a 47-digit linha digitável, and it does not compute the módulo-11 DAC. Encoding is [`@allansli/barcode-febraban-core`](../core/README.md). Peer: `angular` `>=1.5.0 <2`.

This package is **AngularJS**, not modern Angular. Angular 15+ is [`@allansli/ng-barcode-febraban`](../angular/README.md).

Sibling packages: [`@allansli/react-barcode-febraban`](../react/README.md), [`@allansli/vue-barcode-febraban`](../vue/README.md).

## Install

```bash
npm install @allansli/angular-barcode-febraban
```

## Minimal example

Load core first (it is a real dependency, not bundled into the directive), then this package and the CSS. Register the module `angular-barcode-febraban`.

```html
<script src="node_modules/@allansli/barcode-febraban-core/src/generate-barcode-sequence.js"></script>
<script src="node_modules/@allansli/angular-barcode-febraban/dist/angular-barcode-febraban.min.js"></script>
<link rel="stylesheet" href="node_modules/@allansli/barcode-febraban-core/assets/css/barcode.css" />

<script>
  angular.module("myApp", ["angular-barcode-febraban"]);
</script>

<ng-barcode-febraban barcode-sequence="1234567890"></ng-barcode-febraban>
```

`barcode-sequence` must be a string of digits with even length. Host `BarcodeInterleaved2of5.ttf` yourself; npm does not ship the font.

## When to use

- The app is **AngularJS 1.x** (`angular` `>=1.5 <2`) and you need a **Brazilian boleto ITF** barcode (Febraban / Interleaved 2 of 5).
- You already have an **even-length digit string** and will draw it with **`BarcodeInterleaved2of5.ttf`**.

## When not to use

- **EAN**, **UPC**, **Code 128**, QR, or any symbology other than ITF.
- You still need to turn a **linha digitável** (47 digits) into a código de barras, or to calculate the **DAC**.
- The app is **Angular 2+**. Use `@allansli/ng-barcode-febraban`. React, Vue, and plain JS have their own packages.

## Setup

**1. Include core, then this package, then styles**

```html
<script src="node_modules/@allansli/barcode-febraban-core/src/generate-barcode-sequence.js"></script>
<script src="node_modules/@allansli/angular-barcode-febraban/dist/angular-barcode-febraban.min.js"></script>
<link rel="stylesheet" href="node_modules/@allansli/barcode-febraban-core/assets/css/barcode.css" />
```

Core is a real npm dependency (not concatenated into the AngularJS bundle).
Load it first so `barcodeFebrabanCore` exists, or `require` it in Node.

The CSS `@font-face` points at `../fonts/BarcodeInterleaved2of5.ttf`. npm does
not ship that file; host it yourself (see [`NOTICE`](./NOTICE)).

**2. Add the module to your app**

```javascript
angular.module("myApp", ["angular-barcode-febraban"]);
```

**3. Use the directive**

```html
<ng-barcode-febraban barcode-sequence="1234567890"></ng-barcode-febraban>
<ng-barcode-febraban barcode-sequence="{{vm.sequence}}"></ng-barcode-febraban>
```

The directive uses an isolate scope. Invalid input (including a valid value that later becomes invalid) renders as an empty barcode.

---

## Directive

| Attribute | Type | Description |
|---|---|---|
| `barcode-sequence` | string | Even-length digit string |

The TrueType font is **not** covered by MIT and is **not** in the npm tarball. See [`NOTICE`](./NOTICE) and [`packages/core/NOTICE`](../core/NOTICE).

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

MIT © Allan Martins de Paula (source code). The ITF font in git is not licensed under MIT and is not published to npm.
