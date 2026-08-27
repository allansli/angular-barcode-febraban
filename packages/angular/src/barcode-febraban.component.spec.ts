jest.mock("@angular/core", () => ({
  Component: () => (cls: unknown) => cls,
  Input: () => () => undefined,
  NgModule: () => (cls: unknown) => cls
}));

jest.mock("@angular/common", () => ({
  CommonModule: class CommonModule {}
}));

import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";
import { BarcodeFebrabanComponent } from "./barcode-febraban.component";

function setSequence(component: BarcodeFebrabanComponent, value: string, firstChange = false): void {
  const previous = component.sequence;
  component.sequence = value;
  component.ngOnChanges({
    sequence: {
      previousValue: previous,
      currentValue: value,
      firstChange: firstChange,
      isFirstChange: () => firstChange
    }
  });
}

describe("BarcodeFebrabanComponent", () => {
  it("encodes an even-length digit string on first change", () => {
    const component = new BarcodeFebrabanComponent();
    setSequence(component, "1234567890", true);
    expect(component.barcodeSequence).toBe(generateBarcodeSequence("1234567890"));
  });

  it("renders empty for odd length, non-digits, and empty input", () => {
    const component = new BarcodeFebrabanComponent();
    component.ngOnInit();
    expect(component.barcodeSequence).toBe("");

    setSequence(component, "123");
    expect(component.barcodeSequence).toBe("");

    setSequence(component, "abcd");
    expect(component.barcodeSequence).toBe("");

    setSequence(component, "12e2");
    expect(component.barcodeSequence).toBe("");
  });

  it("clears a previously valid barcode when input becomes invalid", () => {
    const component = new BarcodeFebrabanComponent();
    setSequence(component, "1234567890", true);
    expect(component.barcodeSequence).not.toBe("");
    setSequence(component, "1234567890a");
    expect(component.barcodeSequence).toBe("");
  });

  it("encodes 44-digit código de barras and blanks 47-digit linha digitável", () => {
    const component = new BarcodeFebrabanComponent();
    const codigo = "0".repeat(44);
    const linha = "0".repeat(47);
    setSequence(component, codigo, true);
    expect(component.barcodeSequence).toBe(generateBarcodeSequence(codigo));
    setSequence(component, linha);
    expect(component.barcodeSequence).toBe("");
  });
});
