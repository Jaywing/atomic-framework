var gulp = require('gulp');
var clean = require('del').sync;

// Erases the dist folder
gulp.task('clean', function() {
  clean(['./_build', './dist']);
});