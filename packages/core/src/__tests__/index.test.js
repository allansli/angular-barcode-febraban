const { generateBarcodeSequence } = require("../index");

describe("generateBarcodeSequence", function () {
  it("should return empty string for empty input", function () {
    expect(generateBarcodeSequence("")).toBe("");
  });

  it("should return empty string for odd-length input", function () {
    expect(generateBarcodeSequence("123")).toBe("");
    expect(generateBarcodeSequence("12345678901")).toBe("");
  });

  it("should return non-empty string for valid even-length input", function () {
    expect(generateBarcodeSequence("1234567890")).not.toBe("");
  });

  it("should wrap result in parentheses", function () {
    var result = generateBarcodeSequence("1234");
    expect(result[0]).toBe("(");
    expect(result[result.length - 1]).toBe(")");
  });

  it("should use +48 encoding for pairs <= 49", function () {
    // "00" → 0 + 48 = 48
    var result = generateBarcodeSequence("00");
    expect(result).toBe("(" + String.fromCharCode(48) + ")");

    // "49" → 49 + 48 = 97
    result = generateBarcodeSequence("49");
    expect(result).toBe("(" + String.fromCharCode(97) + ")");
  });

  it("should use +142 encoding for pairs >= 50", function () {
    // "50" → 50 + 142 = 192
    var result = generateBarcodeSequence("50");
    expect(result).toBe("(" + String.fromCharCode(192) + ")");

    // "99" → 99 + 142 = 241
    result = generateBarcodeSequence("99");
    expect(result).toBe("(" + String.fromCharCode(241) + ")");
  });

  it("should process multiple pairs correctly", function () {
    var result = generateBarcodeSequence("1234567890");
    // 12 → 12+48=60, 34 → 34+48=82, 56 → 56+142=198, 78 → 78+142=220, 90 → 90+142=232
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
});
