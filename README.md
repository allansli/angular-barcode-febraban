# angular-barcode-febraban
Angular Directive to Render Interleaved 2 of 5 Barcode

[![Build Status](https://travis-ci.org/allansli/angular-barcode-febraban.svg?branch=develop)](https://travis-ci.org/allansli/angular-barcode-febraban)

## Usage
1. Include module `angular-barcode-febraban` into your app.
 * ```javascript
  (function () {
     "use strict";
    
     angular.module("my.app", ["angular-barcode-febraban"]);
  })();
2. Use the directive as example below:
 * `<ng-barcode-febraban barcode-sequence="1234567890"></ng-barcode-febraban>`
