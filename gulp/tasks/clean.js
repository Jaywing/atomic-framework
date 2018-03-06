var gulp = require('gulp');
var clean = require('del').sync;

gulp.task('clean', function() {
  clean(['./_build', './dist']);
});