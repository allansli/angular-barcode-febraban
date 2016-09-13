describe("[angular-barcode-febraban] Utils Test", function () {

    var ngBarcodeUtils;

    beforeEach(module("angular-barcode-febraban"));

    beforeEach(inject(function (_ngBarcodeUtils_) {
        ngBarcodeUtils = _ngBarcodeUtils_;
    }));

    it("Must return empty if sequence is empty", function () {
        var value = ngBarcodeUtils.generateBarcodeSequence("");
        expect(value).toBe("");
    });

    it("Must return empty if sequence lenght mod 2 is different from 0", function () {
        var value = ngBarcodeUtils.generateBarcodeSequence("12345678901");
        expect(value).toBe("");
    });

    it("Must return not empty if sequence is not empty and its lenght mod 2 is zero", function () {
        var value = ngBarcodeUtils.generateBarcodeSequence("1234567890");
        expect(value).not.toBe("");
    });
});