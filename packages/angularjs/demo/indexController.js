(function () {
    "use strict";

    angular
        .module("barcode-demo")
        .controller("BarcodeDemoController", BarcodeDemoController);
    function BarcodeDemoController() {
        var vm = this;
        vm.sequence = "1234567890";
    }
})();
