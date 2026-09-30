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

    it("Must render empty div for non-digit even strings like 12e2", function () {
        var element = $compile("<ng-barcode-febraban barcode-sequence=\"12e2\"></ng-barcode-febraban>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBe("<div class=\"barcodei2of5 ng-binding\"></div>");
    });

    it("Must render div with generated barcode sequence", function () {
        var element = $compile("<ng-barcode-febraban barcode-sequence=\"1234567890\"></ng-barcode-febraban>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe("<div class=\"barcodei2of5 ng-binding\"></div>");
        expect(element.text()).toBe("(" +
            String.fromCharCode(60) +
            String.fromCharCode(82) +
            String.fromCharCode(198) +
            String.fromCharCode(220) +
            String.fromCharCode(232) +
            ")");
    });

    it("Must clear a previously valid barcode when input becomes invalid", function () {
        var scope = $rootScope.$new();
        scope.value = "1234567890";
        var element = $compile("<ng-barcode-febraban barcode-sequence=\"{{value}}\"></ng-barcode-febraban>")(scope);
        scope.$digest();
        expect(element.text()).not.toBe("");

        scope.value = "1234567890a";
        scope.$digest();
        expect(element.text()).toBe("");
    });

    it("Must isolate two directives on the same parent scope", function () {
        var scope = $rootScope.$new();
        var html =
            "<div>" +
            "<ng-barcode-febraban barcode-sequence=\"00\"></ng-barcode-febraban>" +
            "<ng-barcode-febraban barcode-sequence=\"99\"></ng-barcode-febraban>" +
            "</div>";
        var element = $compile(html)(scope);
        scope.$digest();
        var barcodes = element.find("ng-barcode-febraban");
        expect(barcodes.length).toBe(2);
        expect(barcodes.eq(0).text()).toBe("(" + String.fromCharCode(48) + ")");
        expect(barcodes.eq(1).text()).toBe("(" + String.fromCharCode(241) + ")");
        expect(scope.sequence).toBeUndefined();
    });
});
