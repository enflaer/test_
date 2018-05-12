'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    concatCss = require('gulp-concat-css'),
    concatJs = require('gulp-concat'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');

var outputDir = 'dist/';
var appDir = 'app/';

gulp.task('sass', function () {
    return gulp.src(appDir + '/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(appDir + '/css'));
});

gulp.task('concatCss', function () {
    return gulp.src([appDir + '/css/*.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(concatCss("main.css"))
        .pipe(prefix('last 3 versions'))
        .pipe(csso())
        .pipe(gulp.dest(outputDir + '/css/'))
        .pipe(browserSync.stream());
});

gulp.task('concatJs', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', appDir + '/js/*.js'])
        .pipe(concatJs('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(outputDir + '/js'))
        .pipe(browserSync.stream());
});
gulp.task('pug', function () {
    return gulp.src("app/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("app/"))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
    browserSync.init({
        port: 1337,
        server: {
            baseDir: outputDir
        }
    });
});

gulp.task('copyHtml', function () {
   return gulp.src("app/*.html")
       .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function () {
    gulp.watch(appDir + 'scss/*.scss', gulp.series('sass'));
    gulp.watch(appDir + 'css/*.css', gulp.series('concatCss'));
    gulp.watch(appDir + 'js/*.js', gulp.series('concatJs'));
    gulp.watch(appDir + '*.pug', gulp.series('pug'));
    gulp.watch(appDir + '*.html', gulp.series('copyHtml'));
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

