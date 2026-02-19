"use strict";

var React = require("react");
var core = require("@allansli/barcode-febraban-core");

/**
 * BarcodeFebraban — React component for rendering ITF (Interleaved 2 of 5)
 * barcodes using the BarcodeInterleaved2of5 font.
 *
 * CJS build — no JSX, no compilation required.
 *
 * @param {Object}        props
 * @param {string|number} props.sequence     - Numeric barcode sequence (even length)
 * @param {string}        [props.className]  - Additional CSS class names
 * @param {Object}        [props.style]      - Inline styles applied to the wrapper div
 */
function BarcodeFebraban(props) {
  var sequence = props.sequence;
  var className = props.className;
  var style = props.style;

  var seq = sequence !== undefined && sequence !== null ? String(sequence) : "";
  var isValid = seq.length > 0 && !isNaN(Number(seq));
  var barcodeSequence = isValid ? core.generateBarcodeSequence(seq) : "";

  var cls = "barcodei2of5" + (className ? " " + className : "");

  return React.createElement("div", { className: cls, style: style }, barcodeSequence);
}

module.exports = BarcodeFebraban;
module.exports.BarcodeFebraban = BarcodeFebraban;
module.exports.default = BarcodeFebraban;
