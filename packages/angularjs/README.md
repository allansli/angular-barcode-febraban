# @allansli/angular-barcode-febraban

AngularJS (1.x) directive that encodes an even-length digit string for **`BarcodeInterleaved2of5.ttf`**. It is a font encoder, not a Febraban boleto parser (no 47→44 linha digitável conversion, no DAC).

Powered by [`@allansli/barcode-febraban-core`](../core/README.md).

Peer: `angular` `>=1.5 <2`.

---

## Installation

```bash
npm install @allansli/angular-barcode-febraban
```

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
