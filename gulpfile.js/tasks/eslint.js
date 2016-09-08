var config       = require('../config')
if(!config.tasks.eslint) return

var gulp         = require('gulp')
var path         = require('path')
var eslint     = require('gulp-eslint')

var paths = {
  src: path.join(config.root.src, config.tasks.eslint.src, '/**/*.{' + config.tasks.scsslint.extensions + '}')
}

var esLintTask = function () {
  return gulp.src([
    paths.src,
    '!node_modules/**', // this folder is ignored
  ])
    .pipe(eslint())
    .pipe(eslint.format('checkstyle'))
}

gulp.task('eslint', esLintTask)
module.exports = esLintTask
