"use strict";

var fs = require("fs");
var gulp = require("gulp");
var gulpSequence = require("gulp-sequence");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var CONFIG = require("../config.js");

gulp.task("dist", function(cb) {
  global.production = true;

  gulpSequence(
    "clean:dist",
    "sass:dist",
    "html",
    "webpack:dist",
    "images",
    "icons",
    "fonts",
    cb
  );
});

gulp.task("sass:dist", function() {
  return gulp
    .src("./_docs/scss/app.scss")
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: CONFIG.SASS_PATHS,
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(
      postcss([
        autoprefixer({
          browsers: CONFIG.CSS_COMPATIBILITY
        })
      ])
    )
    .pipe(gulp.dest("./docs/css"));
});
