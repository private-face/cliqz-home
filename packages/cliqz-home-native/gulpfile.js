const path = require('path');
const gulp = require('gulp');
const del = require('del');
const browserify = require('browserify');
const watchify = require('watchify');
const plumber = require('gulp-plumber');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const defineModule = require('gulp-define-module');
const merge = require('merge-stream');
const uglify = require('gulp-uglify');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const minify = composer(uglifyes, console);

const wrap = require('gulp-wrap');
const concat = require('gulp-concat');
const declare = require('gulp-declare');
const handlebars = require('gulp-handlebars');
 
const b = watchify(browserify({
	entries: ['./src/js/app.js'],
	debug: true
}));
b.on('log', gutil.log);
 
gulp.task('clean', function() {
	del.sync('./dist/**/*');
});

gulp.task('templates', function() {

  const partials = gulp.src(['src/templates/_*.hbs'])
    .pipe(handlebars({ handlebars: require('handlebars') }))
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        processPartialName: function(fileName) {
          return JSON.stringify(path.basename(fileName, '.js').substr(1));
        }
      }	
   }));

  const templates = gulp.src('src/templates/**/[^_]*.hbs', { base: './src/templates' })
    .pipe(handlebars({ handlebars: require('handlebars') }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      root: 'exports',
      noRedeclare: true
    }));

  return merge(partials, templates)
    .pipe(concat('index.js'))
    .pipe(wrap('var Handlebars = require("handlebars/runtime");\n <%= contents %>'))
    .pipe(gulp.dest('src/templates/compiled'));
});

gulp.task('css', ['clean'], function() {
	return gulp.src(['./src/css/**'])
		.pipe(plumber())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('index', ['css', 'static', 'templates'], function() {
	return gulp.src(['./src/index.html'])
		.pipe(plumber())
		.pipe(gulp.dest('./dist'));
});

gulp.task('static', function() {
	return gulp.src(['./src/locales/**/*.json'], { base:'./src/locales' })
		.pipe(plumber())
		.pipe(gulp.dest('./dist/locales'));
});

gulp.task('bundle', ['index'], function() {
	return b.bundle()
		.on('error', function(err) {
			console.log(err.message);
			browserSync.notify(err.message, 3000);
			this.emit('end');
		})
		.pipe(plumber())
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
			// .pipe(minify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', ['bundle'], function() {
	const watcher = gulp.watch('./src/**/*', ['refresh']);
	watcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

gulp.task('browser-sync', ['watch'], function() {
	return browserSync({ server:  { baseDir: './dist' } });
});

gulp.task('refresh', ['bundle'], browserSync.reload);
gulp.task('serve', ['browser-sync']);
gulp.task('default', ['bundle'], function() {
	 process.exit(0);
});
