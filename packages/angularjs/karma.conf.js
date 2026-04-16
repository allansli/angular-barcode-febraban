// Karma configuration for @allansli/angular-barcode-febraban
module.exports = function (config) {
  config.set({

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
      "src/**/*.js": ["coverage"]
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

    autoWatch: false,

    // ChromeHeadlessCI uses --no-sandbox which is required in CI environments
    // (GitHub Actions runners run as root or in containers without a sandbox).
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
      }
    },

    browsers: ["ChromeHeadlessCI"],

    singleRun: true,

    concurrency: Infinity
  });
};
