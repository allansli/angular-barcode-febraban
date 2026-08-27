const { generateBarcodeSequence } = require("../index");
const shared = require("../generate-barcode-sequence");

const CODIGO_BARRAS_44 = "23793381286000005000000000000000000000000000";
const LINHA_DIGITAVEL_47 = "23793.38128 60000.050000 00000.000000 0 00000000000000".replace(
  /[\s.]/g,
  ""
);

describe("generateBarcodeSequence", function () {
  it("exports the shared implementation from the CJS entry", function () {
    expect(generateBarcodeSequence).toBe(shared);
  });

  it("should return empty string for empty input", function () {
    expect(generateBarcodeSequence("")).toBe("");
  });

  it("should return empty string for odd-length input", function () {
    expect(generateBarcodeSequence("123")).toBe("");
    expect(generateBarcodeSequence("12345678901")).toBe("");
  });

  it("should return empty string for null and undefined", function () {
    expect(generateBarcodeSequence(null)).toBe("");
    expect(generateBarcodeSequence(undefined)).toBe("");
  });

  it("should return empty string for non-string numbers", function () {
    expect(generateBarcodeSequence(1234)).toBe("");
    expect(generateBarcodeSequence(0)).toBe("");
  });

  it("should return empty string for non-digit even-length strings", function () {
    expect(generateBarcodeSequence("abcd")).toBe("");
    expect(generateBarcodeSequence("12e2")).toBe("");
    expect(generateBarcodeSequence("12 4")).toBe("");
    expect(generateBarcodeSequence("12.4")).toBe("");
  });

  it("should return empty string for whitespace-only input", function () {
    expect(generateBarcodeSequence("  ")).toBe("");
    expect(generateBarcodeSequence("12\n34")).toBe("");
  });

  it("should encode leading zeros", function () {
    var result = generateBarcodeSequence("0012");
    expect(result).toBe(
      "(" + String.fromCharCode(48) + String.fromCharCode(60) + ")"
    );
  });

  it("should wrap result in parentheses", function () {
    var result = generateBarcodeSequence("1234");
    expect(result[0]).toBe("(");
    expect(result[result.length - 1]).toBe(")");
  });

  it("should use +48 encoding for pairs <= 49", function () {
    expect(generateBarcodeSequence("00")).toBe("(" + String.fromCharCode(48) + ")");
    expect(generateBarcodeSequence("49")).toBe("(" + String.fromCharCode(97) + ")");
  });

  it("should use +142 encoding for pairs >= 50", function () {
    expect(generateBarcodeSequence("50")).toBe("(" + String.fromCharCode(192) + ")");
    expect(generateBarcodeSequence("99")).toBe("(" + String.fromCharCode(241) + ")");
  });

  it("should process multiple pairs correctly", function () {
    var result = generateBarcodeSequence("1234567890");
    var expected =
      "(" +
      String.fromCharCode(60) +
      String.fromCharCode(82) +
      String.fromCharCode(198) +
      String.fromCharCode(220) +
      String.fromCharCode(232) +
      ")";
    expect(result).toBe(expected);
  });

  it("should encode a 44-digit código de barras", function () {
    expect(CODIGO_BARRAS_44).toHaveLength(44);
    var result = generateBarcodeSequence(CODIGO_BARRAS_44);
    expect(result.charAt(0)).toBe("(");
    expect(result.charAt(result.length - 1)).toBe(")");
    expect(result.length).toBe(1 + 22 + 1);
  });

  it("should return empty for a 47-digit linha digitável (no conversion)", function () {
    expect(LINHA_DIGITAVEL_47).toHaveLength(47);
    expect(generateBarcodeSequence(LINHA_DIGITAVEL_47)).toBe("");
    expect(generateBarcodeSequence("0".repeat(47))).toBe("");
  });
});
