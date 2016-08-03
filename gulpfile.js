// Imports
// -------------------------
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: '*',
        rename: {}
    }),
    params = {
        isProd : true,
        pkg : require('./package.json'),
    },
    sources = require('./gulp/sources.js'),
    utils = require('./gulp/utils.js')(gulp, $);

// Set environment param
// -------------------------
params.isProd = ($.util.env.dev === undefined);


/* ------------------------- *\
    Generate css files from less
\* ------------------------- */
gulp.task('less', function () {
    return gulp.src(sources.less.src.main)
        .pipe($.if(!params.isProd, $.sourcemaps.init()))
        .pipe($.plumber({
            errorHandler: utils.onError
        }))
        .pipe($.less())
        .pipe($.if(params.isProd, $.cssnano({
            safe: true
        })))
        .pipe($.concat('app.css'))
        .pipe($.autoprefixer())
        .pipe($.if(!params.isProd, $.sourcemaps.write()))
        .pipe(gulp.dest(sources.less.dest))
        .pipe($.browserSync.stream());
});

// Watch less
// -------------------------
gulp.task('watch:less', function () {
    $.watch(sources.less.src.watch, function() {
        gulp.start('less');
    });
});

/* ------------------------- *\
    Generate js files
\* ------------------------- */
gulp.task('js', function () {
    return gulp.src(sources.js.src)
        .pipe($.if(!params.isProd, $.sourcemaps.init()))
        .pipe($.plumber({
            errorHandler: utils.onError
        }))
        .pipe($.concat('app.js'))
        .pipe($.if(params.isProd, $.uglify()))
        .pipe($.if(!params.isProd, $.sourcemaps.write()))
        .pipe(gulp.dest(sources.js.dest))
        .pipe($.browserSync.stream());
});

// Watch js
// -------------------------
gulp.task('watch:js', function () {
    $.watch(sources.js.src, function() {
        gulp.start('js');
    });
});

/* ------------------------- *\
    Generate html files
\* ------------------------- */
gulp.task('html', function () {
    return gulp.src(sources.html.src)
        .pipe($.browserSync.stream());
});

// Watch html
// -------------------------
gulp.task('watch:html', function () {
    $.watch(sources.html.src, function() {
        gulp.start('html');
    });
});

/* ------------------------- *\
    Copy assets files
\* ------------------------- */
gulp.task('assets', function () {
    return gulp.src(sources.assets.src)
        .pipe(gulp.dest(sources.assets.dest))
        .pipe($.browserSync.stream());
});

// Watch assets
// -------------------------
gulp.task('watch:assets', function () {
    $.watch(sources.assets.src, function() {
        gulp.start('assets');
    });
});

/* ------------------------- *\
    Copy root files
\* ------------------------- */
gulp.task('rootFiles', function () {
    return gulp.src(sources.rootFiles.src)
        .pipe(gulp.dest(sources.rootFiles.dest))
        .pipe($.browserSync.stream());
});

// Watch rootFiles
// -------------------------
gulp.task('watch:rootFiles', function () {
    $.watch(sources.rootFiles.src, function() {
        gulp.start('rootFiles');
    });
});

/* ------------------------- *\
    Clean task
\* ------------------------- */
gulp.task('clean', function () {
    return $.del(sources.clean);
});

/* ------------------------- *\
    Build
\* ------------------------- */
gulp.task('build:ui', ['less', 'js', 'html', 'assets', 'rootFiles']);
gulp.task('default', ['clean'], function () {
    $.runSequence('build:ui', function () {
        var message = ' Successfully generated : ' + params.pkg.name + ' [v' + params.pkg.version + '] | High Five ! ';

        if (params.isProd) {
            utils.logMessage(message, 'success');
        } else {
            utils.logMessage(message, 'warning');
        }
    });
});

/* ------------------------- *\
    Watch
\* ------------------------- */
gulp.task('watch', ['build:ui', 'watch:less', 'watch:js', 'watch:html', 'watch:assets', 'watch:rootFiles']);


/* ------------------------- *\
    Serve
\* ------------------------- */
gulp.task('serve', ['watch'], function() {
    $.browserSync.init({
        server: {
            baseDir: './'
        }
    });
});