# @allansli/ng-barcode-febraban

Draw the barcode on a **Brazilian boleto** in Angular. That barcode is **ITF (Interleaved 2 of 5)**, the symbology **Febraban** uses. `@allansli/ng-barcode-febraban` is an Angular 15+ standalone component: it encodes an even-length digit string (usually the 44-digit código de barras) and renders it with `BarcodeInterleaved2of5.ttf`.

It does not convert a 47-digit linha digitável, and it does not compute the módulo-11 DAC. Encoding is [`@allansli/barcode-febraban-core`](../core/README.md). This package is **Angular**, not AngularJS. AngularJS 1.x is [`@allansli/angular-barcode-febraban`](../angularjs/README.md).

Sibling packages: [`@allansli/react-barcode-febraban`](../react/README.md), [`@allansli/vue-barcode-febraban`](../vue/README.md).

## Install

```bash
npm install @allansli/ng-barcode-febraban
```

`@allansli/barcode-febraban-core` is a dependency. Peers: `@angular/core` and `@angular/common` `>=15.0.0`.

## Minimal example

```typescript
import { Component } from "@angular/core";
import { BarcodeFebrabanComponent } from "@allansli/ng-barcode-febraban";

@Component({
  standalone: true,
  imports: [BarcodeFebrabanComponent],
  template: `<barcode-febraban [sequence]="codigoDeBarras"></barcode-febraban>`
})
export class AppComponent {
  codigoDeBarras = "1234567890";
}
```

Load the core CSS (and host the TTF yourself; npm does not ship the font):

```css
@import "@allansli/barcode-febraban-core/assets/css/barcode.css";
```

## When to use

- The app is **Angular 15+** and you need a **Brazilian boleto ITF** barcode (Febraban / Interleaved 2 of 5).
- You already have an **even-length digit string** and will draw it with **`BarcodeInterleaved2of5.ttf`**.

## When not to use

- **EAN**, **UPC**, **Code 128**, QR, or any symbology other than ITF.
- You still need to turn a **linha digitável** (47 digits) into a código de barras, or to calculate the **DAC**.
- The app is **AngularJS 1.x** (`@allansli/angular-barcode-febraban`), React, Vue, or plain JS.

## NgModule and static attributes

**NgModule apps** can import `BarcodeFebrabanModule`, which re-exports the same standalone component.

**CSS** — in `angular.json` styles, or the `@import` in the minimal example.

```html
<barcode-febraban sequence="1234567890"></barcode-febraban>
<barcode-febraban [sequence]="codigoDeBarras"></barcode-febraban>
```

---

## API

### `<barcode-febraban>` inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `sequence` | `string` | `""` | Even-length digit string. Do not bind a JS `number`. |
| `cssClass` | `string` | `""` | Additional CSS class names |
| `barcodeStyle` | `object` | `{}` | Inline styles (named to avoid colliding with Angular `[style]`) |

Invalid input renders as an empty barcode.

The CSS `@font-face` expects a TTF you host yourself; npm does not ship the font.
See [`packages/core/NOTICE`](../core/NOTICE).

---

## License

MIT © Allan Martins de Paula (source code). The ITF font in git is not licensed under MIT and is not published to npm.
