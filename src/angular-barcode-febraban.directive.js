(function () {
    "use strict";

    angular
        .module("angular-barcode-febraban")
        .directive("ngBarcodeFebraban", ngBarcodeFebraban);

    ngBarcodeFebraban.$inject = ["ngBarcodeUtils"];

    function ngBarcodeFebraban(ngBarcodeUtils) {

        var directive = {
            link: link,
            restrict: "E",
            template: "<div class=\"barcodei2of5\">{{::sequence}}</div>",
            scope: false
        };

        return directive;

        function link(scope, element, attrs) {
            if ("barcodeSequence" in attrs) {
                scope.sequence = ngBarcodeUtils.generateBarcodeSequence(attrs.barcodeSequence);
            }
        }
    }
})();