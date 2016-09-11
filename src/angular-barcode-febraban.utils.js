(function () {
    "use strict";

    angular
        .module("angular-barcode-febraban")
        .service("ngBarcodeUtils", utils);

    function utils() {
        var utils = {
            generateBarcodeSequence: generateBarcodeSequence
        };

        return utils;

        function generateBarcodeSequence(barcode) {
            var barcodeSequence = "";
            
            if (barcode.length > 0
                && barcode.length % 2 === 0) {
                for (var index = 0; index < barcode.length; index = index + 2) {
                    
                    var item = Number(barcode.substr(index, 2));
                    var charCode;

                    if (item <= 49) {
                        charCode = item + 48;
                    }
                    else {
                        charCode = item + 142;
                    }

                    barcodeSequence = barcodeSequence + String.fromCharCode(charCode);
                }

                barcodeSequence = "(" + barcodeSequence + ")";
            }

            return barcodeSequence;
        }
    }
})();