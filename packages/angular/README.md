# @allansli/ng-barcode-febraban

Angular (2+) component to render **ITF (Interleaved 2 of 5)** barcodes for Brazilian **FEBRABAN** banking standards (boleto bancário). Uses the `BarcodeInterleaved2of5` font — no images, no SVG.

Powered by [`@allansli/barcode-febraban-core`](../core/README.md).

---

## Installation

```bash
npm install @allansli/ng-barcode-febraban
```

## Setup

**1. Import the module**

```typescript
// app.module.ts
import { NgModule } from "@angular/core";
import { BarcodeFebrabânModule } from "@allansli/ng-barcode-febraban";

@NgModule({
  imports: [BarcodeFebrabânModule]
})
export class AppModule {}
```

**2. Include the barcode CSS**

In `angular.json`, add to the `styles` array:

```json
"styles": [
  "node_modules/@allansli/barcode-febraban-core/assets/css/barcode.css"
]
```

Or import directly in your global `styles.css`:

```css
@import "~@allansli/barcode-febraban-core/assets/css/barcode.css";
```

**3. Use the component in your template**

```html
<!-- static -->
<barcode-febraban sequence="1234567890"></barcode-febraban>

<!-- dynamic binding -->
<barcode-febraban [sequence]="myBarcodeSequence"></barcode-febraban>
```

---

## API

### `<barcode-febraban>` inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `sequence` | `string \| number` | `""` | Numeric barcode sequence (even number of digits) |
| `className` | `string` | `""` | Additional CSS class names |
| `style` | `object` | `{}` | Inline styles for the wrapper element |

---

## Building the package

```bash
npm run build  # runs ng-packagr
```

---

## License

MIT © Allan Martins de Paula
