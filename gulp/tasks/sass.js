'use strict';

var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sassLint = require('gulp-sass-lint');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var CONFIG = require('../config.js');

gulp.task('sass', ['sass:atomic', 'sass:docs']);

// Compiles Atomic Sass
gulp.task('sass:atomic', function() {
  return gulp.src(['./scss/atomic.scss'])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
        includePaths: CONFIG.SASS_PATHS
      }).on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: CONFIG.CSS_COMPATIBILITY
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    // .on('finish', function() {
    //   gulp.src(CONFIG.SASS_LINT_FILES)
    //     .pipe(sassLint({
    //         config: './.sass-lint.yml'
    //       }))
    //     .pipe(sassLint.format());
    // });
});

gulp.task('sass:docs', function() {
  return gulp.src('./docs/scss/docs.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: CONFIG.SASS_DOC_PATHS
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: CONFIG.CSS_COMPATIBILITY
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./_build/css'));
});