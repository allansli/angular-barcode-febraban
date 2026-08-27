"use strict";

const fs     = require("fs");
const gulp   = require("gulp");
const concat = require("gulp-concat");
const jshint = require("gulp-jshint");
const uglify = require("gulp-uglify");
const cssmin = require("gulp-cssmin");

// Core library UMD build — concatenated first so barcodeFebrabanCore
// global is available to the AngularJS source files.
const CORE_SRC = "../core/src/generate-barcode-sequence.js";

function clean(done) {
  fs.rmSync("dist", { recursive: true, force: true });
  done();
}

function lint() {
  return gulp.src(["src/*.js", "!node_modules/**"])
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
}

// Prepend the core library, then concat all AngularJS source files.
// Order matters: core → module → utils → directive.
function concatJsFiles() {
  return gulp.src([
    CORE_SRC,
    "./src/angular-barcode-febraban.module.js",
    "./src/angular-barcode-febraban.utils.js",
    "./src/angular-barcode-febraban.directive.js"
  ])
    .pipe(concat("angular-barcode-febraban.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"));
}

function minifyCss() {
  return gulp.src("./assets/css/barcode.css")
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css/"));
}

function copyBarcodeFont() {
  return gulp.src("./assets/fonts/BarcodeInterleaved2of5.ttf")
    .pipe(gulp.dest("./dist/fonts/"));
}

const bundle = gulp.parallel(concatJsFiles, minifyCss, copyBarcodeFont);

// deploy: clean → lint → bundle
// Note: karma tests are run separately by CI (requires xvfb + Chrome).
// Run `karma start karma.conf.js --single-run` locally to execute tests.
const deploy = gulp.series(clean, lint, bundle);

exports.clean   = clean;
exports.lint    = lint;
exports.bundle  = bundle;
exports.deploy  = deploy;
exports.build   = deploy;  // alias: npm run build → gulp deploy
exports.default = deploy;
