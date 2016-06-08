var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    cssnano     = require('gulp-cssnano'),
    del         = require('del'),
    syncy       = require('syncy'),
    runSequence = require('run-sequence'),
    rev         = require('gulp-rev'),
    revReplace  = require('gulp-rev-replace'),
    revReplaceCustom = function(manifest, prefix) {
        prefix  = typeof prefix !== 'undefined' ? prefix : '';

        return revReplace({
            manifest: manifest,
            modifyUnreved: function(str) {
                return new RegExp('"('+prefix+'\/)?'+str.slice(0, str.lastIndexOf('.'))+'"');
            },
            modifyReved: function(str) {
                return '"'+str.slice(0, str.lastIndexOf('.'))+'"';
            }
        });
    };

gulp.task("scripts", function(){
    return gulp.src(['js/app/**/*.js'])
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/js/app'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/js/app'));
});

gulp.task("styles", function(){
    return gulp.src(['css/**/*.css'])
        .pipe(cssnano())
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("config", function(){
    return gulp.src(['sounds/sounds.json'])
        .pipe(rev())
        .pipe(gulp.dest('dist/sounds'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/sounds'));
});

gulp.task("scripts-rev-replace", function(){
    var manifest = gulp.src('dist/js/app/rev-manifest.json');

    return gulp.src(['dist/js/app/**/*.js'])
        .pipe(revReplaceCustom(manifest, '/js/app'))
        .pipe(gulp.dest('dist/js/app'));
});

gulp.task("styles-rev-replace", function(){
    var manifest = gulp.src('dist/css/rev-manifest.json');

    return gulp.src(['dist/index.html'])
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("config-rev-replace", function(){
    var manifest = gulp.src('dist/sounds/rev-manifest.json');

    return gulp.src(['dist/js/app/**/*.js'])
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest('dist/js/app'));
});

gulp.task('clean', function() {
    return del(['dist/js', 'dist/css', 'dist/index.html', 'dist/sounds/sounds*.json', '!dist/empty']);
});

gulp.task('sync', function() {
    syncy(['.htaccess', './favicons/**', './img/**', 'index.html', './node_modules/**', 'robots.txt', './sounds/**', '!./sounds/sounds.json'], 'dist', {
        updateAndDelete: true,
    }).on('error', console.error).end();
});

gulp.task("build", function(){
    return runSequence('clean', 'sync', 'scripts', 'scripts-rev-replace', 'styles', 'styles-rev-replace', 'config', 'config-rev-replace');
});
