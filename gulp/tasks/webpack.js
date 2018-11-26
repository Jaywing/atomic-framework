var gulp = require("gulp");
var gulpif = require("gulp-if");
var webpack = require("webpack-stream");
var webpack2 = require("webpack");
var path = require("path");

var webpackConfig = {
  context: path.resolve("js/"),
  entry: {
    app: ["babel-polyfill", "app.js"]
  },
  output: {
    path: path.resolve("_build/js/"),
    filename: "app.js",
    publicPath: "/js/"
  },
  plugins: [
    // new UglifyJsPlugin()
  ],
  resolve: {
    modules: [path.resolve("js/"), path.resolve("node_modules")]
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: path.resolve("node_modules"),
        query: {
          presets: [["es2015", { modules: false }], "stage-1"]
        }
      }
    ]
  }
};

var webpackConfig_dist = {
  context: path.resolve("js/"),
  entry: {
    app: ["babel-polyfill", "app.js"]
  },
  output: {
    path: path.resolve("docs/js/"),
    filename: "app.js",
    publicPath: "https://jaywing.github.io/atomic-framework/js/"
  },
  plugins: [
    // new UglifyJsPlugin()
  ],
  resolve: {
    modules: [path.resolve("js/"), path.resolve("node_modules")]
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: path.resolve("node_modules"),
        query: {
          presets: [["es2015", { modules: false }], "stage-1"]
        }
      }
    ]
  }
};

gulp.task("webpack", function() {
  return gulp
    .src("./js/app.js")
    .pipe(webpack(webpackConfig, webpack2))
    .pipe(gulp.dest("./_build/js"));
});

gulp.task("webpack:dist", function() {
  return gulp
    .src("./js/app.js")
    .pipe(webpack(webpackConfig_dist, webpack2))
    .pipe(gulp.dest("./docs/js"));
});
