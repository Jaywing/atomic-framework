module.exports = {
  html: {
    excludeFolders: ['components', 'layouts', 'shared', 'macros', 'data'],
    dataFunction: function(file) {
      // const fs = require('fs');
      // return JSON.parse(fs.readFileSync('./../../src/html/data/index.json', 'utf8'));

      const fs = require('fs');
      const path = require('path');

      var filename = file.path.split('.njk')[0];
      var splitOperator = '\\';
      if (filename.toString().indexOf(splitOperator) < 0) splitOperator = '/';
      filename = filename.toString().split(splitOperator);
      filename = filename[filename.length - 1] + '.json';
      var dataPath = path.resolve('./../../src/html/data/' + filename);

      var tempJson;
      if (fs.existsSync(dataPath)) {
        tempJson = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      }
      return tempJson;
    }
  },
  images: true,
  fonts: true,
  static: true,
  svgSprite: true,
  ghPages: true,
  stylesheets: true,

  javascripts: {
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
  }
};
