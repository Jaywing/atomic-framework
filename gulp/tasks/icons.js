var gulp = require("gulp");
var gulpif = require("gulp-if");
var svgstore = require("gulp-svgstore");

var CONFIG = require("../config.js");

gulp.task("icons", ["icons:atomic", "icons:docs"]);

gulp.task("icons:atomic", function() {
  return gulp
    .src("./icons/*.svg")
    .pipe(svgstore())
    .pipe(gulp.dest("./dist/images/"));
});

gulp.task("icons:docs", function() {
  return gulp
    .src("./icons/*.svg")
    .pipe(svgstore())
    .pipe(gulpif(!global.production, gulp.dest("./_build/images/")))
    .pipe(gulpif(global.production, gulp.dest("./docs/images")));
});
