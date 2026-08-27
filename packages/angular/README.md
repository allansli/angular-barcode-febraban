# @allansli/ng-barcode-febraban

Angular 15+ **standalone** component that encodes an even-length digit string for **`BarcodeInterleaved2of5.ttf`**. It is a font encoder, not a Febraban boleto parser (no 47→44 linha digitável conversion, no DAC).

Powered by [`@allansli/barcode-febraban-core`](../core/README.md).

---

## Installation

```bash
npm install @allansli/ng-barcode-febraban
```

Core is a runtime dependency of this package (no extra install).

## Setup

**Standalone component (Angular 15+)**

```typescript
import { Component } from "@angular/core";
import { BarcodeFebrabanComponent } from "@allansli/ng-barcode-febraban";

@Component({
  standalone: true,
  imports: [BarcodeFebrabanComponent],
  template: `<barcode-febraban [sequence]="myBarcodeSequence"></barcode-febraban>`
})
export class AppComponent {
  myBarcodeSequence = "1234567890";
}
```

**NgModule apps** can import `BarcodeFebrabanModule`, which re-exports the same standalone component.

**CSS** — in `angular.json` styles, or:

```css
@import "@allansli/barcode-febraban-core/assets/css/barcode.css";
```

```html
<barcode-febraban sequence="1234567890"></barcode-febraban>
<barcode-febraban [sequence]="myBarcodeSequence"></barcode-febraban>
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

The bundled TrueType font is **not** covered by MIT. See [`packages/core/NOTICE`](../core/NOTICE).

---

## License

MIT © Allan Martins de Paula (source code). The ITF font shipped by the core package is not licensed under MIT.
