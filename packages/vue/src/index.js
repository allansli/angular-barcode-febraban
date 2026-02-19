import BarcodeFebraban from "./BarcodeFebraban.vue";

export { BarcodeFebraban };
export default BarcodeFebraban;

/**
 * Vue plugin — registers BarcodeFebraban as a global component.
 *
 * Usage:
 *   import { createApp } from "vue";
 *   import BarcodeFebrabanPlugin from "@allansli/vue-barcode-febraban";
 *   import "@allansli/barcode-febraban-core/assets/css/barcode.css";
 *
 *   const app = createApp(App);
 *   app.use(BarcodeFebrabanPlugin);
 */
export const BarcodeFebrabanPlugin = {
  install(app) {
    app.component("BarcodeFebraban", BarcodeFebraban);
  }
};
