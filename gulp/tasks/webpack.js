var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack', function() {
  return gulp.src('./js/app.js')
    .pipe(webpack())
    .pipe(gulp.dest('./_build/'));
});