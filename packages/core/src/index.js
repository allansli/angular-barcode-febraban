/**
 * @allansli/barcode-febraban-core
 *
 * Core JavaScript library that encodes even-length digit strings for the
 * BarcodeInterleaved2of5 font. Not a Febraban boleto engine.
 *
 * UMD build — works in browsers (global), CommonJS (Node/bundlers), and AMD.
 * The algorithm lives in generate-barcode-sequence.js so CJS and ESM share it.
 */
(function (root, factory) {
  "use strict";
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./generate-barcode-sequence"));
  } else if (typeof define === "function" && define.amd) {
    define(["./generate-barcode-sequence"], function (generateBarcodeSequence) {
      return factory(generateBarcodeSequence);
    });
  } else {
    var generateBarcodeSequence =
      root.generateBarcodeSequence ||
      (root.barcodeFebrabanCore && root.barcodeFebrabanCore.generateBarcodeSequence);
    root.barcodeFebrabanCore = factory(generateBarcodeSequence);
  }
})(typeof self !== "undefined" ? self : this, function (generateBarcodeSequence) {
  "use strict";
  return {
    generateBarcodeSequence: generateBarcodeSequence
  };
});
