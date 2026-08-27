import React from "react";
import renderer from "react-test-renderer";
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";
import { BarcodeFebraban } from "../src/BarcodeFebraban";

function renderText(sequence) {
  const tree = renderer.create(React.createElement(BarcodeFebraban, { sequence })).toJSON();
  return tree.children ? tree.children.join("") : "";
}

describe("BarcodeFebraban", function () {
  it("encodes an even-length digit string", function () {
    expect(renderText("1234567890")).toBe(generateBarcodeSequence("1234567890"));
  });

  it("renders empty for odd length", function () {
    expect(renderText("123")).toBe("");
  });

  it("renders empty for non-digits", function () {
    expect(renderText("abcd")).toBe("");
    expect(renderText("12e2")).toBe("");
  });

  it("renders empty for empty input", function () {
    expect(renderText("")).toBe("");
    expect(renderText(undefined)).toBe("");
    expect(renderText(null)).toBe("");
  });

  it("encodes a 44-digit código de barras and blanks 47-digit linha digitável", function () {
    const codigo = "0".repeat(44);
    const linha = "0".repeat(47);
    expect(renderText(codigo)).toBe(generateBarcodeSequence(codigo));
    expect(renderText(linha)).toBe("");
  });

  it("applies extra class names", function () {
    const tree = renderer
      .create(React.createElement(BarcodeFebraban, { sequence: "00", className: "extra" }))
      .toJSON();
    expect(tree.props.className).toBe("barcodei2of5 extra");
  });
});
