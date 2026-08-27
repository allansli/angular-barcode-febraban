/**
 * @allansli/barcode-febraban-core — TypeScript declarations
 *
 * Font encoder for BarcodeInterleaved2of5.ttf. Not a Febraban boleto parser.
 */

/**
 * Encodes an even-length digit string for the BarcodeInterleaved2of5 font.
 *
 * Returns "" when `barcode` is not a string, is empty, has odd length,
 * or contains any non-digit character. Does not convert 47-digit linha
 * digitável (odd length → "") and does not compute a DAC.
 *
 * @param barcode - Numeric string with an even number of digits.
 * @returns Font-encoded barcode string, or "" for invalid input.
 */
export declare function generateBarcodeSequence(barcode: string): string;

declare const _default: {
  generateBarcodeSequence: typeof generateBarcodeSequence;
};

export default _default;
