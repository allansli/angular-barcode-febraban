import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

/**
 * BarcodeFebrabânComponent renders an ITF (Interleaved 2 of 5) barcode
 * using the BarcodeInterleaved2of5 font.
 *
 * Usage:
 *   <barcode-febraban sequence="1234567890"></barcode-febraban>
 *
 * Dynamic binding:
 *   <barcode-febraban [sequence]="myBarcodeValue"></barcode-febraban>
 */
@Component({
  selector: "barcode-febraban",
  template: `<div class="barcodei2of5" [ngClass]="className" [ngStyle]="style">{{ barcodeSequence }}</div>`
})
export class BarcodeFebrabânComponent implements OnChanges {
  /**
   * Numeric barcode sequence. Must have an even number of digits.
   * Non-numeric or odd-length values render as an empty barcode.
   */
  @Input() sequence: string | number = "";

  /**
   * Additional CSS class names applied to the wrapper element.
   */
  @Input() className: string = "";

  /**
   * Inline styles applied to the wrapper element.
   */
  @Input() style: { [key: string]: string } = {};

  barcodeSequence: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sequence"]) {
      const seq = this.sequence !== undefined && this.sequence !== null
        ? String(this.sequence)
        : "";
      const isValid = seq.length > 0 && !isNaN(Number(seq));
      this.barcodeSequence = isValid ? generateBarcodeSequence(seq) : "";
    }
  }
}
