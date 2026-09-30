/**
 * Font encoder for BarcodeInterleaved2of5.ttf.
 *
 * This is not a Febraban boleto parser: it does not convert 47-digit
 * linha digitável to a 44-digit código de barras, and it does not
 * compute or check the módulo-11 DAC.
 *
 * Shared by the CJS/UMD and ESM entry points.
 */
(function (root, factory) {
  "use strict";
  var generateBarcodeSequence = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = generateBarcodeSequence;
  } else if (typeof define === "function" && define.amd) {
    define([], function () {
      return generateBarcodeSequence;
    });
  } else {
    root.generateBarcodeSequence = generateBarcodeSequence;
    root.barcodeFebrabanCore = { generateBarcodeSequence: generateBarcodeSequence };
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /**
   * Generates an ITF barcode sequence string for use with the
   * BarcodeInterleaved2of5 font.
   *
   * The algorithm processes the input in 2-digit pairs and maps each pair
   * to a character code:
   *   - pairs 00-49  → charCode = pair + 48
   *   - pairs 50-99  → charCode = pair + 142
   *
   * The result is wrapped in parentheses, which the font renders as the
   * start/stop bars of the ITF barcode.
   *
   * @param {string} barcode - A numeric string with an even number of digits.
   * @returns {string} Font-encoded barcode string, or "" for invalid input.
   */
  function generateBarcodeSequence(barcode) {
    if (typeof barcode !== "string") {
      return "";
    }

    if (barcode.length === 0 || barcode.length % 2 !== 0 || !/^\d+$/.test(barcode)) {
      return "";
    }

    var barcodeSequence = "";

    for (var index = 0; index < barcode.length; index = index + 2) {
      var item = Number(barcode.substr(index, 2));
      var charCode = item <= 49 ? item + 48 : item + 142;
      barcodeSequence = barcodeSequence + String.fromCharCode(charCode);
    }

    return "(" + barcodeSequence + ")";
  }

  return generateBarcodeSequence;
});
