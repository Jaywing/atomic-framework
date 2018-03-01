var gulp = require('gulp');

var CONFIG = require('../config.js');

// Copies static assets
gulp.task('images', ['images:atomic', 'images:docs']);

gulp.task('images:atomic', function() {
  return gulp.src('./images/**/*{jpg,png,svg}')
  .pipe(gulp.dest('./dist/images'));
});

gulp.task('images:docs', function() {
  return gulp.src('./docs/images/**/*{jpg,png,svg}')
  .pipe(gulp.dest('./_build/images'));
});