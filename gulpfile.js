var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include');

gulp.task('build:css', function() {
    return gulp.src('./src/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch:css', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.series('build:css'));
});

gulp.task('build:vendor:scripts', function() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/js/dist/util.js',
            './node_modules/bootstrap/js/dist/modal.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('build:scripts', function() {
    return gulp.src(['./src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch:scripts', function() {
    gulp.watch('./src/js/**/*.js', gulp.series('build:scripts'));
});

gulp.task('include:html', function() {
    return gulp.src(['./layouts/home.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./frontend/'));
});

gulp.task('default', gulp.parallel('include:html', 'build:css', 'build:scripts', 'build:vendor:scripts', 'watch:css', 'watch:scripts'));