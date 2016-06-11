var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    cssnano     = require('gulp-cssnano'),
    del         = require('del'),
    syncy       = require('syncy'),
    runSequence = require('run-sequence'),
    rev         = require('gulp-rev'),
    revReplace  = require('gulp-rev-replace');

gulp.task("scripts-rev", function(){
    return gulp.src(['js/app/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js/app'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/js/app'));
});

gulp.task("scripts-min", function(){
    return gulp.src(['dist/js/app/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/app'));
});

gulp.task("styles-rev", function(){
    return gulp.src(['css/**/*.css'])
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("styles-min", function(){
    return gulp.src(['dist/css/**/*.css'])
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("config-rev", function(){
    return gulp.src(['sounds/sounds.json'])
        .pipe(rev())
        .pipe(gulp.dest('dist/sounds'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/sounds'));
});

gulp.task("scripts-rev-replace", function(){
    var manifest = gulp.src('dist/js/app/rev-manifest.json');

    return gulp.src(['dist/js/app/**/*.js'])
        .pipe(revReplace({
            manifest: manifest,
            modifyUnreved: function(str) {
                return '"'+str.slice(0, str.lastIndexOf('.'))+'"';
            },
            modifyReved: function(str) {
                return '"'+str.slice(0, str.lastIndexOf('.'))+'"';
            }
        }))
        .pipe(gulp.dest('dist/js/app'));
});

gulp.task("index-rev-replace", function(){
    var manifest = gulp.src('dist/js/app/rev-manifest.json');

    return gulp.src(['dist/index.html'])
        .pipe(revReplace({
            manifest: manifest,
            modifyUnreved: function(str) {
                return '"/js/app/'+str.slice(0, str.lastIndexOf('.'))+'"';
            },
            modifyReved: function(str) {
                return '"/js/app/'+str.slice(0, str.lastIndexOf('.'))+'"';
            }
        }))
        .pipe(gulp.dest('dist'));
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
    syncy(['.htaccess', './favicons/**', './img/**', './js/app/templates/**', 'index.html', './node_modules/**', 'robots.txt', './sounds/**', '!./sounds/sounds.json'], 'dist', {
        updateAndDelete: true,
    }).on('error', console.error).end();
});

gulp.task("build", function(){
    return runSequence('clean', 'sync', 'scripts-rev', 'styles-rev', 'config-rev', 'scripts-rev-replace', 'styles-rev-replace', 'config-rev-replace', 'index-rev-replace', /*'scripts-min',*/ 'styles-min');
});
