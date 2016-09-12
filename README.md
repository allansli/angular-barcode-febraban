# angular-barcode-febraban
Angular Directive to Render Interleaved 2 of 5 Barcode

[![Build Status](https://travis-ci.org/allansli/angular-barcode-febraban.svg?branch=develop)](https://travis-ci.org/allansli/angular-barcode-febraban)

## Usage
1. Install **angular-barcode-febraban** using **npm**.
 * `npm install angular-barcode-febraban --save`
2. Include module **angular-barcode-febraban** into your app.
 * `angular.module("my.app", ["angular-barcode-febraban"]);`
3. Add **script** and **css** references in html.
 * `<script src="../node_modules/angular-barcode-febraban/dist/angular-barcode-febraban.min.js"></script>`
 * `<link rel="stylesheet" href="../node_modules/angular-barcode-febraban/dist/css/barcode.css" />`
4. Use the directive as example below:
 * `<ng-barcode-febraban barcode-sequence="1234567890"></ng-barcode-febraban>`
