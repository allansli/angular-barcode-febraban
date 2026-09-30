import { NgModule } from "@angular/core";
import { BarcodeFebrabanComponent } from "./barcode-febraban.component";

/**
 * Re-exports the standalone BarcodeFebrabanComponent for NgModule apps.
 *
 * Standalone apps can import BarcodeFebrabanComponent directly:
 *   imports: [BarcodeFebrabanComponent]
 */
@NgModule({
  imports: [BarcodeFebrabanComponent],
  exports: [BarcodeFebrabanComponent]
})
export class BarcodeFebrabanModule {}
