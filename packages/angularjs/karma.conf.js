// Karma configuration for @allansli/angular-barcode-febraban
const path = require("path");

function resolveFromPackage(id) {
  // npm workspaces hoist packages to the monorepo root node_modules.
  // Resolve from this package first, then the repo root, so tests work
  // both in a nested install and in a hoisted workspace.
  return require.resolve(id, {
    paths: [__dirname, path.join(__dirname, "../..")]
  });
}

module.exports = function (config) {
  config.set({

    basePath: "",

    frameworks: ["jasmine"],

    // Require plugins explicitly. Karma's auto-discovery looks in
    // ./node_modules relative to this package, which does not exist
    // when dependencies are hoisted to the workspace root.
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-coverage")
    ],

    // The core library must be loaded before the AngularJS source files
    // so that barcodeFebrabanCore global is available to utils.js.
    files: [
      path.join(__dirname, "../core/src/generate-barcode-sequence.js"),
      resolveFromPackage("angular/angular.js"),
      resolveFromPackage("angular-mocks/angular-mocks.js"),
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
