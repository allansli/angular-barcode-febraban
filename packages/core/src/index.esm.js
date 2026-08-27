/**
 * @allansli/barcode-febraban-core — ESM build
 *
 * Re-exports the shared encoder so CJS/UMD and ESM cannot drift.
 */
import generateBarcodeSequence from "./generate-barcode-sequence.js";

export { generateBarcodeSequence };
export default { generateBarcodeSequence };
