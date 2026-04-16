/**
 * @allansli/barcode-febraban-core — TypeScript declarations
 *
 * Provides type information for both the ESM (named export) and
 * CommonJS / UMD (default export) entry points.
 */

/**
 * Generates an ITF (Interleaved 2 of 5) barcode sequence string for use
 * with the BarcodeInterleaved2of5 font.
 *
 * @param barcode - A numeric string with an even number of digits.
 * @returns Font-encoded barcode string, or "" for invalid input.
 */
export declare function generateBarcodeSequence(barcode: string): string;

declare const _default: {
  generateBarcodeSequence: typeof generateBarcodeSequence;
};

export default _default;
