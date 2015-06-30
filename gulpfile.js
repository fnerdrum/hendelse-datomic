var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');

var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');


var JSsourcedir = './src/main/resources/js';
var styleSourcedir = './src/main/resources/style';
var distdir = './src/main/resources/public';

function buildJS(isDev) {
    console.log('Running buildJS task');

    var props = watchify.args;
    props.entries = [JSsourcedir + '/index.js'];
    props.debug = isDev;

    var bundler = isDev ? watchify(browserify(props)) : browserify(props);
    bundler.transform(babelify);

    function createbundle() {
        var start = new Date();
        console.log('creating bundle...');
        return bundler
            .bundle()
            .on('error', notify.onError({message: '<%= error.message %>'}))
            .pipe(source('index.dist.js'))
            .pipe(gulp.dest(distdir))
            .pipe(notify('Build completed in ' + (new Date() - start) + 'ms'));

    }

    bundler.on('update', createbundle);

    return createbundle();
}

function buildLess() {
    console.log('Building less');
    try {
        return gulp.src(styleSourcedir + '/index.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(distdir));
    } finally {
        console.log('Less build complete');
    }
}

gulp.task('default', function () {
    buildJS(false);
    buildLess();
});

gulp.task('less', buildLess);
gulp.task('dev', function () {
    buildJS(true);
    buildLess();
    gulp.watch(styleSourcedir + '/**/*.less', ['less']);
});