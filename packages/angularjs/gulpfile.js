"use strict";

const fs     = require("fs");
const gulp   = require("gulp");
const concat = require("gulp-concat");
const jshint = require("gulp-jshint");
const uglify = require("gulp-uglify");
const cssmin = require("gulp-cssmin");

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

// AngularJS sources only. Core is a workspace/npm dependency and must be
// loaded first as a script tag (or required in Node). Do not concatenate
// core into this bundle so the published tarball does not duplicate it.
function concatJsFiles() {
  return gulp.src([
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

const bundle = gulp.parallel(concatJsFiles, minifyCss);

const deploy = gulp.series(clean, lint, bundle);

exports.clean   = clean;
exports.lint    = lint;
exports.bundle  = bundle;
exports.deploy  = deploy;
exports.build   = deploy;
exports.default = deploy;
