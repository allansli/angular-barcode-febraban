describe("[angular-barcode-febraban] Directive Test", function () {

    var $compile,
        $rootScope;

    beforeEach(module("angular-barcode-febraban"));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it("Must render empty div if barcode attr is undefined", function () {
        var element = $compile("<ng-barcode-febraban></ng-barcode-febraban>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBe("<div class=\"barcodei2of5 ng-binding\"></div>");
    });

    it("Must render empty div if barcode attr is not a number", function () {
        var element = $compile("<ng-barcode-febraban barcode-sequence=\"aaaaa\"></ng-barcode-febraban>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBe("<div class=\"barcodei2of5 ng-binding\"></div>");
    });

    it("Must render div with generated barcode sequence", function () {
        var element = $compile("<ng-barcode-febraban barcode-sequence=\"1234567890\"></ng-barcode-febraban>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe("<div class=\"barcodei2of5 ng-binding\"></div>");
    });
});