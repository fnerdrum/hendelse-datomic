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
        try {
            return bundler
                .bundle()
                .on('error', notifyError)
                .pipe(source('index.dist.js'))
                .pipe(gulp.dest(distdir));
        } finally {
            console.log('bundle created in ' + (new Date() - start) + 'ms');
        }

    }

    bundler.on('update', createbundle);

    return createbundle();
}

function notifyError() {
    notify.onError({
        title: 'Compile error',
        message: '<%= error.message %>'
    })
}

gulp.task('default', buildJS.bind(this, false));
gulp.task('dev', buildJS.bind(this, true));