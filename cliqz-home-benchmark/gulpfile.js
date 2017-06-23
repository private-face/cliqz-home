const gulp = require('gulp');
const del = require('del');
const defineModule = require('gulp-define-module');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const minify = composer(uglifyes, console);
const concat = require('gulp-concat');
 
gulp.task('clean', function() {
	del.sync('./dist/**/*');
});

gulp.task('bundle-common', function() {
	return gulp.src(['src/chart.js', 'src/benchmark.js'])
		.pipe(concat('benchmark.common.js'))
		.pipe(minify())
		.pipe(defineModule('plain', {
			wrapper: "<%= contents %>\nmodule.exports = Benchmark"
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('bundle-es6', function() {
	return gulp.src(['src/chart.js', 'src/benchmark.js'])
		.pipe(concat('benchmark.esm.js'))
		.pipe(minify())
		.pipe(defineModule('plain', {
			wrapper: "<%= contents %>\nexport default Benchmark"
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['clean', 'bundle-common', 'bundle-es6'], function() {
	 process.exit(0);
});
