var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    cssnano     = require('gulp-cssnano'),
    del         = require('del'),
    syncy       = require('syncy'),
    runSequence = require('run-sequence'),
    rev         = require('gulp-rev'),
    RevAll      = require('gulp-rev-all'),
    revReplace  = require('gulp-rev-replace');

function annotator(contents, path) {
    return [{'contents': contents, 'path': path}];
}

function replacer(fragment, replaceRegExp, newReference, referencedFile) {
    fragment.contents = fragment.contents.replace(replaceRegExp, '$1' + newReference + '$3$4');
}

gulp.task("rev-all", function(){
    var revAll  = new RevAll({
        dontRenameFile: [/^\/index\.html/g, /^\/sounds\/(.+)\.mp3/g, /^\/robots\.txt/g, /^\/img\/ks\.jpg/g],
        annotator: annotator,
        replacer: replacer
    });

    return gulp.src(['dist/**'])
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist'))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('dist'));
});

gulp.task("scripts-rev", function(){
    return gulp.src(['js/app/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js/app'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/js/app'));
});

gulp.task("scripts-min", function(){
    return gulp.src(['dist/js/app/**/*.js'])
        .pipe(uglify({
            mangle: { except: ['$', 'require'] }
        }))
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
    return del(['dist']);
});

gulp.task('sync', function() {
    syncy(['.htaccess', './css/**', './favicons/**', './img/**', './js/**', 'index.html', 'robots.txt', './sounds/**'], 'dist', {
        updateAndDelete: true,
    }).on('error', console.error).end();
});

gulp.task("build", function(){
    return runSequence('clean', 'sync');
});
