var gulp = require('gulp');
var browser = require('browser-sync');
var requireDir = require('require-dir');
var port = process.env.SERVER_PORT || 3000;

requireDir('./gulp/tasks');

gulp.task('build', ['clean', 'sass', 'html', 'webpack', 'images', 'icons', 'fonts']);

gulp.task('serve', ['build'], function () {
  browser.init({ server: './_build', port: port, open: false });
});

gulp.task('watch', function () {
  gulp.watch('./html/**/*', ['html:atomic', browser.reload]);
  gulp.watch('./docs/html/**/*', ['html:docs', browser.reload]);
  gulp.watch('./scss/**/*', ['sass:atomic', 'sass:docs', browser.reload]);
  gulp.watch('./docs/scss/**/*', ['sass:docs', browser.reload]);
  gulp.watch('./js/**/*', ['webpack', browser.reload]);
  gulp.watch('./images/**/*', ['images:atomic', browser.reload]);
  gulp.watch('./docs/images/**/*', ['images:docs', browser.reload]);
  gulp.watch('./icons/*', ['icons:atomic', browser.reload]);
  gulp.watch('./docs/icons/*', ['icons:docs', browser.reload]);
  gulp.watch('./fonts/*', ['fonts:atomic', browser.reload]);
});

gulp.task('default', ['serve', 'watch']);
