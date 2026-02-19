import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BarcodeFebrabânComponent } from "./barcode-febraban.component";

/**
 * BarcodeFebrabânModule — Angular module that declares and exports
 * the BarcodeFebrabânComponent for use in other Angular modules.
 *
 * Usage:
 *   import { BarcodeFebrabânModule } from "@allansli/ng-barcode-febraban";
 *
 *   @NgModule({
 *     imports: [BarcodeFebrabânModule]
 *   })
 *   export class AppModule {}
 */
@NgModule({
  declarations: [BarcodeFebrabânComponent],
  imports: [CommonModule],
  exports: [BarcodeFebrabânComponent]
})
export class BarcodeFebrabânModule {}
