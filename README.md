# angular-barcode-febraban
Angular Directive to Render Interleaved 2 of 5 (ITF) Barcode

[![npm version](https://badge.fury.io/js/angular-barcode-febraban.svg)](https://badge.fury.io/js/angular-barcode-febraban)
[![Build Status](https://travis-ci.org/allansli/angular-barcode-febraban.svg?branch=develop)](https://travis-ci.org/allansli/angular-barcode-febraban)
[![Coverage Status](https://coveralls.io/repos/github/allansli/angular-barcode-febraban/badge.svg?branch=master)](https://coveralls.io/github/allansli/angular-barcode-febraban?branch=master)
[![NPM Downloads](https://img.shields.io/npm/dt/angular-barcode-febraban.svg)](https://www.npmjs.com/package/angular-barcode-febraban)
[![dependencies](https://david-dm.org/allansli/angular-barcode-febraban/status.svg)](https://david-dm.org/allansli/angular-barcode-febraban)
[![devDependencies](https://david-dm.org/allansli/angular-barcode-febraban/dev-status.svg)](https://david-dm.org/allansli/angular-barcode-febraban)

## Demo
Check out [here](http://htmlpreview.github.io/?https://github.com/allansli/angular-barcode-febraban/blob/master/demo/index_git.html).

## Usage

Install **angular-barcode-febraban** using **npm**.
 ```js 
 npm install angular-barcode-febraban --save
 `

Include module **angular-barcode-febraban** into your app.
 ```js
 angular.module("my.app", ["angular-barcode-febraban"]);`
```

Add **script** and **css** references in html.
```html
<script src="../node_modules/angular-barcode-febraban/dist/angular-barcode-febraban.min.js"></script>
<link rel="stylesheet" href="../node_modules/angular-barcode-febraban/dist/css/barcode.css" />
```

Use the directive as example below:
 ```html
 <ng-barcode-febraban barcode-sequence="1234567890"></ng-barcode-febraban>
 ```

