import BarcodeFebraban from "./BarcodeFebraban.vue";

/**
 * Vue plugin — registers BarcodeFebraban as a global component.
 *
 * Usage:
 *   import BarcodeFebrabanPlugin from "@allansli/vue-barcode-febraban";
 *   app.use(BarcodeFebrabanPlugin);
 *
 * The component is a named export:
 *   import { BarcodeFebraban } from "@allansli/vue-barcode-febraban";
 */
const BarcodeFebrabanPlugin = {
  install(app) {
    app.component("BarcodeFebraban", BarcodeFebraban);
  }
};

export { BarcodeFebraban, BarcodeFebrabanPlugin };
export default BarcodeFebrabanPlugin;
