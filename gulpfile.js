var gulp = require('gulp');
var browser = require('browser-sync');
var requireDir = require('require-dir');
var port = process.env.SERVER_PORT || 3000;

requireDir('./gulp/tasks');

gulp.task('build', ['clean', 'sass', 'html', 'webpack', 'images', 'icons']);

gulp.task('serve', ['build'], function(){
  browser.init({server: './_build', port: port, open: false});
});

gulp.task('default', ['serve']);