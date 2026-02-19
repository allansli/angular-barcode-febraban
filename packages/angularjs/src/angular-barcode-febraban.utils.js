(function() {
  "use strict";

  // generateBarcodeSequence is provided by @allansli/barcode-febraban-core,
  // which is concatenated into the bundle before this file (see gulpfile.js).
  // In the bundled output, the UMD wrapper of the core library exposes
  // barcodeFebrabanCore on the global scope.
  var utils = {
    generateBarcodeSequence: barcodeFebrabanCore.generateBarcodeSequence
  };

  angular.module("angular-barcode-febraban").constant("ngBarcodeUtils", utils);
})();
