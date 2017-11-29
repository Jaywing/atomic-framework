module.exports = {
  html: {
    excludeFolders: ['components', 'layouts', 'shared', 'macros', 'data']
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
