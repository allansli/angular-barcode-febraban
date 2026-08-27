import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

/**
 * Encodes an even-length digit string for BarcodeInterleaved2of5.ttf.
 * Not a Febraban boleto parser.
 *
 *   <barcode-febraban sequence="1234567890"></barcode-febraban>
 *   <barcode-febraban [sequence]="myBarcodeValue"></barcode-febraban>
 */
@Component({
  selector: "barcode-febraban",
  standalone: true,
  imports: [CommonModule],
  template: `<div class="barcodei2of5" [ngClass]="cssClass" [ngStyle]="barcodeStyle">{{ barcodeSequence }}</div>`
})
export class BarcodeFebrabanComponent implements OnInit, OnChanges {
  /**
   * Even-length digit string. Do not bind a JS number (44-digit values
   * are not safe as floats).
   */
  @Input() sequence: string = "";

  /**
   * Additional CSS class names applied to the wrapper element.
   */
  @Input() cssClass: string = "";

  /**
   * Inline styles applied to the wrapper element. Named barcodeStyle
   * so it does not collide with Angular's host [style] bindings.
   */
  @Input() barcodeStyle: { [key: string]: string } = {};

  barcodeSequence: string = "";

  ngOnInit(): void {
    this.updateBarcode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sequence"]) {
      this.updateBarcode();
    }
  }

  private updateBarcode(): void {
    this.barcodeSequence = generateBarcodeSequence(this.sequence == null ? "" : this.sequence);
  }
}
