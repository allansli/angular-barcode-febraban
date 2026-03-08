// Karma configuration for @allansli/angular-barcode-febraban
module.exports = function (config) {
  var configuration = {

    basePath: "",

    frameworks: ["jasmine"],

    // The core library must be loaded before the AngularJS source files
    // so that barcodeFebrabanCore global is available to utils.js.
    files: [
      "../core/src/index.js",
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "src/angular-barcode-febraban.module.js",
      "src/angular-barcode-febraban.utils.js",
      "src/angular-barcode-febraban.directive.js",
      "tests/**/*.spec.js"
    ],

    exclude: [],

    preprocessors: {
      "src/**/*.js": "coverage"
    },

    reporters: ["progress", "coverage"],

    coverageReporter: {
      dir: "coverage/",
      reporters: [
        { type: "html", subdir: "report-html" },
        { type: "lcov", subdir: "lcov-report" }
      ]
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ["PhantomJS"],

    singleRun: false,

    concurrency: Infinity
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ["PhantomJS"];
  }

  config.set(configuration);
};
