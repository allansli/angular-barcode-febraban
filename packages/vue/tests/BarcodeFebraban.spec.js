import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";
import BarcodeFebrabanPlugin, { BarcodeFebraban } from "../src/index.js";

describe("BarcodeFebraban", () => {
  it("encodes an even-length digit string", () => {
    const wrapper = mount(BarcodeFebraban, { props: { sequence: "1234567890" } });
    expect(wrapper.text()).toBe(generateBarcodeSequence("1234567890"));
    expect(wrapper.classes()).toContain("barcodei2of5");
  });

  it("renders empty for odd length, non-digits, and empty input", () => {
    expect(mount(BarcodeFebraban, { props: { sequence: "123" } }).text()).toBe("");
    expect(mount(BarcodeFebraban, { props: { sequence: "abcd" } }).text()).toBe("");
    expect(mount(BarcodeFebraban, { props: { sequence: "12e2" } }).text()).toBe("");
    expect(mount(BarcodeFebraban, { props: { sequence: "" } }).text()).toBe("");
  });

  it("encodes 44-digit código de barras and blanks 47-digit linha digitável", () => {
    const codigo = "0".repeat(44);
    const linha = "0".repeat(47);
    expect(mount(BarcodeFebraban, { props: { sequence: codigo } }).text()).toBe(
      generateBarcodeSequence(codigo)
    );
    expect(mount(BarcodeFebraban, { props: { sequence: linha } }).text()).toBe("");
  });

  it("lets class and style fall through onto the root", () => {
    const wrapper = mount(BarcodeFebraban, {
      props: { sequence: "00" },
      attrs: { class: "extra", style: "font-size: 40px;" }
    });
    expect(wrapper.classes()).toContain("extra");
    expect(wrapper.classes()).toContain("barcodei2of5");
    expect(wrapper.attributes("style")).toContain("font-size");
  });

  it("registers via app.use(default export)", () => {
    const app = createApp({ template: "<BarcodeFebraban sequence='00' />" });
    app.use(BarcodeFebrabanPlugin);
    expect(app._context.components.BarcodeFebraban).toBeTruthy();
  });
});
