(function () {
    "use strict";

    angular
        .module("barcode-demo")
        .controller("BarcodeDemoController", BarcodeDemoController);
    function BarcodeDemoController(ngBarcodeUtils) {
        var vm = this;
    }
})();