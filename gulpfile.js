var gulp = require('gulp');
var pkg = require('./package.json');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');

var spawn = require('child_process').spawn;

var htmlFiles = ['./src/apprun.html'];
var imgFiles = './src/assets/images/*.*';
var scriptLibFiles = ['./src/assets/js/lib/jquery.min.js','./src/assets/js/lib/imgotv-sdk.js'];
var scriptFiles = ['./src/assets/js/comm/underscore.min.1.8.3.js',
    './src/assets/js/comm/fastclick.js',
    './src/assets/js/comm/ua.js',
    './src/assets/js/comm/utils.js',
    './src/assets/js/api.js',
    './src/assets/js/app.js'];
var cssFiles = ['./src/assets/css/app.css','./src/assets/css/page.css','./src/assets/css/config.css'];
var banner = [
            ' // ----------------------------------------------------------------------------',
            ' // <%= pkg.description %>',
            ' // v<%= pkg.version %> - Built <%= grunt.template.today("yyyy-mm-dd HH:MM") %>',
            ' // Licensed under the MIT license.',
            ' // ----------------------------------------------------------------------------',
            ' // Copyright (C) 2010-<%= grunt.template.today("yyyy") %> Cheney Lin',
            ' // http://www.linchangyu.com/',
            ' // ----------------------------------------------------------------------------',
            '\n'
        ].join('\n');

gulp.task('default', function(){
  // concat all scripts, minify, and output
    gulp.src(scriptFiles)
        .pipe(concat('run.js'))
        .pipe(minify())
        //.pipe(uglify())
        .pipe( gulp.dest('./dist/'));

    gulp.src(cssFiles)
        .pipe(concat('run.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/'));

    gulp.src(htmlFiles)
        .pipe(gulp.dest('./dist/'));

    gulp.src(imgFiles)
        .pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('html', function(){
    return gulp.src(htmlFiles)
    .pipe(gulp.dest('./dist/'));
    });
gulp.task('img', function(){
    return gulp.src(imgFiles)
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/images/'));
    });
gulp.task('js', function(){
    return gulp.src(scriptFiles)
    .pipe(concat('run.js'))
    .pipe(minify())
    //.pipe(uglify())
    .pipe(gulp.dest('./dist/'));
    });

gulp.task('css', function(){
    return gulp.src(cssFiles)
    .pipe(concat('run.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/'));
    });

gulp.task('test', function(){
    // lint our scripts
    gulp.src(scriptFiles)
    .pipe(jshint());
    });
