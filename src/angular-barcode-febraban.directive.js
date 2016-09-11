(function () {
    "use strict";

    function ngBarcodeFebraban(ngBarcodeUtils) {

        var directive = {
            link: link,
            restrict: "E",
            template: "<div class=\"barcodei2of5\">{{sequence}}</div>",
            scope: false
        };

        return directive;

        function link(scope, element, attrs) {

            attrs.$observe("barcodeSequence", function (value) {
                if (angular.isDefined(value) &&
                    angular.isNumber(Number(value)) &&
                    !isNaN(Number(value))) {
                    scope.sequence = ngBarcodeUtils.generateBarcodeSequence(attrs.barcodeSequence);
                }
            });

        }
    }

    ngBarcodeFebraban.$inject = ["ngBarcodeUtils"];

    angular
        .module("angular-barcode-febraban")
        .directive("ngBarcodeFebraban", ngBarcodeFebraban);

})();