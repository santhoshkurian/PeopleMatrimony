'use strict';

var path = require('path');
var gulp = require('gulp');

gulp.task('copy-css', function () {
    gulp
        .src('src/lib/**/*.css' )
        .pipe(gulp.dest('dist/lib'));
});
gulp.task('copy-js', function () {
    gulp
        .src('src/lib/**/*.js' )
        .pipe(gulp.dest('dist/lib'));
});
