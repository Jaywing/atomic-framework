const fs = require('fs');
const path = require('path');
const mergeJson = require('merge-json');
const sassLint = require('gulp-sass-lint');

module.exports = {
  html: {
    excludeFolders: ['components', 'layouts', 'shared', 'macros', 'data'],
    dataFunction: function(file) {
      var globalData = JSON.parse(fs.readFileSync('./../../src/html/data/global.json', 'utf8'));
      var pageData = globalData;
      var filename = file.path.split('.njk')[0];
      var splitOperator = '\\';
      if (filename.toString().indexOf(splitOperator) < 0) splitOperator = '/';
      filename = filename.toString().split(splitOperator);
      filename = filename[filename.length - 1] + '.json';
      var dataPath = path.resolve('./../../src/html/data/' + filename);

      if (fs.existsSync(dataPath)) {
        pageData = mergeJson.merge(globalData, JSON.parse(fs.readFileSync(dataPath, 'utf8')));
      }

      return pageData;
    }
  },
  images: true,
  fonts: true,
  static: true,
  svgSprite: true,
  ghPages: true,
  stylesheets: true,
  javascripts: {
    publicPath: '/javascripts',
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ['babel-polyfill', './app.js']
    },
    babel: {
      presets: ['es2015', 'stage-1'],
      plugins: ['transform-object-assign']
    },
    extractSharedJs: false
  },
  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    },
    open: false
  },
  production: {
    rev: true
  },
  additionalTasks: {
    initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
      gulp.task('lint', function() {
        return gulp
          .src([
            path.resolve(
              process.env.PWD,
              PATH_CONFIG.src,
              PATH_CONFIG.stylesheets.src,
              '**/*.{' + TASK_CONFIG.stylesheets.extensions + '}'
            ),
            '!' +
              path.resolve(
                process.env.PWD,
                PATH_CONFIG.src,
                PATH_CONFIG.stylesheets.src,
                'vendor/**/*.{' + TASK_CONFIG.stylesheets.extensions + '}'
              ),
            '!' +
              path.resolve(
                process.env.PWD,
                PATH_CONFIG.src,
                PATH_CONFIG.stylesheets.src,
                'docs/**/*.{' + TASK_CONFIG.stylesheets.extensions + '}'
              )
          ])
          .pipe(
            sassLint({
              options: {
                formatter: 'stylish'
              },
              configFile: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.stylesheets.src, 'lint.yml')
            })
          )
          .pipe(sassLint.format())
          .pipe(sassLint.failOnError());
      });
    },
    development: {
      prebuild: ['lint'],
      postbuild: null
    },
    production: {
      prebuild: null,
      postbuild: null
    }
  }
};
