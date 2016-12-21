/**
 * Created by kenei on 12/10/2016.
 */
var gulp = require('gulp')

var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')
var htmlreplace = require('gulp-html-replace')

var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')

var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var es = require('event-stream')
var concat = require('gulp-concat')


/* nicer browserify errors */
var gutil = require('gulp-util')
var chalk = require('chalk')

function map_error(err) {
    if (err.fileName) {
        // regular error
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.fileName.replace(__dirname + '/app/', ''))
            + ': '
            + 'Line '
            + chalk.magenta(err.lineNumber)
            + ' & '
            + 'Column '
            + chalk.magenta(err.columnNumber || err.column)
            + ': '
            + chalk.blue(err.description))
    } else {
        // browserify error..
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.message))
    }

    this.emit('end');
}
/* */

gulp.task('watchify', function () {
    var args = merge(watchify.args, { debug: true })
    var bundler = watchify(browserify('./app/*.js', args)).transform(babelify, { /* opts */ })
    bundle_js(bundler)

    bundler.on('update', function () {
        bundle_js(bundler)
    })
})

function bundle_js(bundler) {
    return bundler.bundle()
        .on('error', map_error)
        .pipe(source('./app/index.js'))
        .pipe(buffer())
        .pipe(gulp.dest('.././dist2'))
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.init({ loadMaps: true }))
        // capture sourcemaps from transforms
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.././dist2'))
}

// Without watchify
gulp.task('browserify', function () {
    var bundler = browserify('./app/index.js', { debug: true }).transform(babelify, {presets: ['es2015', 'react']})
    return bundle_js(bundler)
})

gulp.task('html', function() {
    return gulp.src('./app/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'app.min.js'
        }))
        .pipe(gulp.dest('.././dist/'));
});


// Without sourcemaps
gulp.task('browserify-production', function () {
    var bundler = browserify('./app/index.js').transform(babelify, {presets: ['es2015', 'react']})

    return bundler.bundle()
        .on('error', map_error)
        .pipe(source('./app/index.js'))
        .pipe(buffer())
        .pipe(rename('app.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('.././dist'))
});

gulp.task('css', function () {
    var appCss = gulp.src('./app/css/*.css'),
        combinedCss = es.concat(appCss).pipe(concat('css.css'));
    return es.concat(combinedCss)
        .pipe(gulp.dest('.././dist'));
});

gulp.task('default', ['html', 'css', 'browserify-production'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
