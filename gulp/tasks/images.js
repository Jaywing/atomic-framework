var gulp = require("gulp");
var gulpif = require("gulp-if");

var CONFIG = require("../config.js");

gulp.task("images", ["images:atomic", "images:docs"]);

gulp.task("images:atomic", function() {
  return gulp
    .src("./images/**/*{jpg,png,svg}")
    .pipe(gulp.dest("./dist/images"));
});

gulp.task("images:docs", function() {
  return gulp
    .src("./_docs/images/**/*{jpg,png,svg}")
    .pipe(gulpif(!global.production, gulp.dest("./_build/images/")))
    .pipe(gulpif(global.production, gulp.dest("./docs/images")));
});
