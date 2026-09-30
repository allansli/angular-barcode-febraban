import React from "react";
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

/**
 * BarcodeFebraban — React component that renders a BarcodeInterleaved2of5
 * font string. Not a Febraban boleto parser.
 *
 * @param {Object} props
 * @param {string} props.sequence    - Even-length digit string
 * @param {string} [props.className] - Additional CSS class names
 * @param {Object} [props.style]     - Inline styles for the wrapper div
 */
function BarcodeFebraban({ sequence, className, style }) {
  var barcodeSequence = generateBarcodeSequence(sequence == null ? "" : sequence);
  var cls = "barcodei2of5" + (className ? " " + className : "");

  return React.createElement(
    "div",
    { className: cls, style: style },
    barcodeSequence
  );
}

export default BarcodeFebraban;
export { BarcodeFebraban };
