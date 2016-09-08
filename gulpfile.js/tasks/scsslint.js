var config       = require('../config')
if(!config.tasks.scsslint) return

var gulp         = require('gulp')
var path         = require('path')
var scsslint     = require('gulp-scss-lint')

var paths = {
  src:    path.join(config.root.src, config.tasks.scsslint.src, '/**/*.{' + config.tasks.scsslint.extensions + '}'),
  config: path.join(config.root.src, config.tasks.scsslint.src, config.tasks.scsslint.config)
}

var scssLintTask = function () {
  return gulp.src([
      paths.src,
      '!src/stylesheets/generated/_generated.icons.sass', // this file is ignored (generated for icons)
      '!src/stylesheets/vendor/**/*.scss', // these files are ignored as they are vendor files
      '!src/stylesheets/trumps/*.scss' // these files are ignored as they are hackey trump files
    ])
    .pipe(scsslint({
      'maxBuffer': 807200,
      'config': paths.config,
      'filePipeOutput': 'scssReport.json'
    }))
    .pipe(gulp.dest('./logs'))
}

gulp.task('scsslint', scssLintTask)
module.exports = scssLintTask
