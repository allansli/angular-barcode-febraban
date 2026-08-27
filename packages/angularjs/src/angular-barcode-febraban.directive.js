(function() {
  "use strict";
  function ngBarcodeFebraban(ngBarcodeUtils) {
    var directive = {
      link: link,
      restrict: "E",
      template: "<div class=\"barcodei2of5\">{{sequence}}</div>",
      scope: {
        barcodeSequence: "@"
      }
    };

    return directive;

    function link(scope, element, attrs) {
      attrs.$observe("barcodeSequence", function(value) {
        scope.sequence = ngBarcodeUtils.generateBarcodeSequence(
          angular.isDefined(value) ? value : ""
        );
      });
    }
  }

  ngBarcodeFebraban.$inject = ["ngBarcodeUtils"];

  angular
    .module("angular-barcode-febraban")
    .directive("ngBarcodeFebraban", ngBarcodeFebraban);
})();
