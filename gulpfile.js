var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');

var buildDir = 'build';

gulp.task('default', ['js', 'test']);

gulp.task('test', bundleTest);


var b = watchify(browserify('src/coord.js', {extensions: ['.js'], debug: true}));
var bTest = watchify(browserify('test/test.js', {extensions: ['.js'], debug: true}));

b.on('Update', bundle);
bTest.on('Update', bundleTest);


gulp.task('js', bundle);


function bundle() {
	return b.transform('babelify', {presets: ['es2015']})
		.bundle()
		.on('error', function(e) {
			gutil.log(e);
		})
		.pipe(source('coord.js'))
		.pipe(gulp.dest(buildDir));
}

function bundleTest() {
	return bTest.transform('babelify', {presets: ['es2015']})
		.bundle()
		.on('error', function(e) {
			gutil.log(e);
		})
		.pipe(source('test.js'))
		.pipe(gulp.dest(buildDir));
}