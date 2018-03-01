var gulp        = require('gulp');
var svgstore  = require('gulp-svgstore')

var CONFIG = require('../config.js');

gulp.task('icons', ['icons:atomic', 'icons:docs']);

gulp.task('icons:atomic', function() {
  return gulp.src('./icons/*.svg')
    .pipe(svgstore())
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('icons:docs', function() {
  return gulp.src('./icons/*.svg')
    .pipe(svgstore())
    .pipe(gulp.dest('./_build/images/'));
});