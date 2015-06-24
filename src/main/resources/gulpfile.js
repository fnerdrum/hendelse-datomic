var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');


var JSsourcedir = './js';
var distdir = './public';

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

gulp.task('default', buildJS.bind(this, false));
gulp.task('dev', buildJS.bind(this, true));