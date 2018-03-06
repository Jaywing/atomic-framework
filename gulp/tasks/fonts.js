var gulp = require('gulp');

var CONFIG = require('../config.js');

gulp.task('fonts', ['fonts:atomic', 'fonts:docs']);

gulp.task('fonts:atomic', function () {
  return gulp.src('./fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('fonts:docs', function () {
  return gulp.src('./fonts/**/*')
    .pipe(gulp.dest('./_build/fonts/'));
});