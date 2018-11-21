var gulp = require("gulp");
var gulpif = require("gulp-if");

var CONFIG = require("../config.js");

gulp.task("fonts", ["fonts:atomic", "fonts:docs"]);

gulp.task("fonts:atomic", function() {
  return gulp.src("./fonts/**/*").pipe(gulp.dest("./dist/fonts/"));
});

gulp.task("fonts:docs", function() {
  return gulp
    .src("./fonts/**/*")
    .pipe(gulpif(!global.production, gulp.dest("./_build/fonts")))
    .pipe(gulpif(global.production, gulp.dest("./docs/fonts")));
});
