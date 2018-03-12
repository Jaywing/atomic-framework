'use strict';

var browserSync    = require('browser-sync')
var data           = require('gulp-data')
var gulp           = require('gulp')
var nunjucksRender = require('gulp-nunjucks-render')
var fs             = require('fs')
var path           = require('path');
var mergeJson      = require('merge-json');

var CONFIG = require('../config.js');

gulp.task('html', ['html:atomic', 'html:docs']);

gulp.task('html:atomic', function() {
  const dataFunction = function(file) {
    var globalData = path.resolve('html/data/global.json');
    var pageData = JSON.parse(fs.readFileSync(globalData));
    var filename = file.path.split('.njk')[0];
    var splitOperator = '\\';
    if (filename.toString().indexOf(splitOperator) < 0) splitOperator = '/';
    filename = filename.toString().split(splitOperator);
    filename = filename[filename.length - 1] + '.json';
    var dataPath = path.resolve('html/data/' + filename);

    if (fs.existsSync(dataPath)) {
      pageData = mergeJson.merge(
        JSON.parse(fs.readFileSync(globalData, 'utf8')),
        JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      );
    }
    return pageData;
  }

  return gulp.src(['./html/**/*.njk', '!./html/{components,layouts,shared,macros,data}/**'])
  .pipe(data(dataFunction))
  .pipe(nunjucksRender({path: ['./html']}))
  .pipe(gulp.dest('dist'))
});

gulp.task('html:docs', function() {
  const dataFunction = function(file) {
    var globalData = path.resolve('docs/html/data/global.json');
    var pageData = JSON.parse(fs.readFileSync(globalData));
    var filename = file.path.split('.njk')[0];
    var splitOperator = '\\';
    if (filename.toString().indexOf(splitOperator) < 0) splitOperator = '/';
    filename = filename.toString().split(splitOperator);
    filename = filename[filename.length - 1] + '.json';
    var dataPath = path.resolve('docs/html/data/' + filename);

    if (fs.existsSync(dataPath)) {
      pageData = mergeJson.merge(
        JSON.parse(fs.readFileSync(globalData, 'utf8')),
        JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      );
    }
    return pageData;
  }

  return gulp.src(['./docs/html/**/*.njk', '!./docs/html/{components,layouts,shared,macros,data}/**'])
  .pipe(data(dataFunction))
  .pipe(nunjucksRender({path: ['./docs/html']}))
  .pipe(gulp.dest('_build'))
});