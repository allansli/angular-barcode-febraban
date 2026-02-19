/**
 * @allansli/barcode-febraban-core — ESM build
 *
 * Core pure JavaScript library for generating ITF (Interleaved 2 of 5) barcode
 * sequences compatible with the BarcodeInterleaved2of5 font.
 *
 * Designed for Brazilian FEBRABAN banking standards (boleto bancário).
 */

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
 *
 * @example
 * generateBarcodeSequence("1234567890");
 * // returns "(<RÆÜè)" — renders as a visual barcode when using the ITF font
 */
export function generateBarcodeSequence(barcode) {
  var barcodeSequence = "";

  if (barcode.length > 0 && barcode.length % 2 === 0) {
    for (var index = 0; index < barcode.length; index = index + 2) {
      var item = Number(barcode.substr(index, 2));
      var charCode;

      if (item <= 49) {
        charCode = item + 48;
      } else {
        charCode = item + 142;
      }

      barcodeSequence = barcodeSequence + String.fromCharCode(charCode);
    }

    barcodeSequence = "(" + barcodeSequence + ")";
  }

  return barcodeSequence;
}

export default { generateBarcodeSequence };
