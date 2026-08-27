(function() {
  "use strict";
  /* global require, barcodeFebrabanCore */

  // Prefer the workspace/npm package. In a browser script-tag build, fall
  // back to the barcodeFebrabanCore global from core's UMD (loaded first).
  function loadEncoder() {
    var core = null;
    if (typeof require === "function") {
      try {
        core = require("@allansli/barcode-febraban-core");
      } catch (err) {
        core = null;
      }
    }
    if (core && typeof core.generateBarcodeSequence === "function") {
      return core.generateBarcodeSequence;
    }
    if (typeof barcodeFebrabanCore !== "undefined" && barcodeFebrabanCore) {
      return barcodeFebrabanCore.generateBarcodeSequence;
    }
    throw new Error(
      "@allansli/barcode-febraban-core must be loaded before angular-barcode-febraban"
    );
  }

  angular.module("angular-barcode-febraban").constant("ngBarcodeUtils", {
    generateBarcodeSequence: loadEncoder()
  });
})();
