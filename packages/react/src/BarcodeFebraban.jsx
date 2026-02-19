import React from "react";
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

/**
 * BarcodeFebraban — React component for rendering ITF (Interleaved 2 of 5)
 * barcodes using the BarcodeInterleaved2of5 font.
 *
 * @param {Object}        props
 * @param {string|number} props.sequence     - Numeric barcode sequence (even length)
 * @param {string}        [props.className]  - Additional CSS class names
 * @param {Object}        [props.style]      - Inline styles applied to the wrapper div
 */
function BarcodeFebraban({ sequence, className, style }) {
  var seq = sequence !== undefined && sequence !== null ? String(sequence) : "";
  var isValid = seq.length > 0 && !isNaN(Number(seq));
  var barcodeSequence = isValid ? generateBarcodeSequence(seq) : "";

  var cls = "barcodei2of5" + (className ? " " + className : "");

  return React.createElement(
    "div",
    { className: cls, style: style },
    barcodeSequence
  );
}

export default BarcodeFebraban;
export { BarcodeFebraban };
