var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    cssnano     = require('gulp-cssnano'),
    del         = require('del'),
    syncy       = require('syncy'),
    runSequence = require('run-sequence'),
    RevAll      = require('gulp-rev-all'),
    revReplace  = require('gulp-rev-replace');

gulp.task("rev-all", function(){
    var revAll  = new RevAll({
        dontGlobal: [/^\/favicon.ico$/g, /^\/sounds\/(.+)\.mp3/g],
        dontRenameFile: [/^\/index\.html/g, /^\/robots\.txt/g, /^\/img\/ks\.jpg/g]
    });

    return gulp.src(['dist/**'])
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist'))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('dist'));
});

gulp.task("scripts-min", function(){
    return gulp.src(['dist/js/app/**/*.js'])
        .pipe(uglify({
            mangle: { except: ['$', 'require'] }
        }))
        .pipe(gulp.dest('dist/js/app'));
});

gulp.task("styles-min", function(){
    return gulp.src(['dist/css/**/*.css'])
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("scripts-rev-replace", function(){
    var manifest = gulp.src('dist/rev-manifest.json'),
        replaceStr = function(str) {
            str = str.replace(/[\/]?js\/app\//g, "");
            if( str.match(/\.js$/) || str.match(/\.hbs$/) ) {
                return '"'+( str.match(/\.hbs$/) ? 'hbs!' : '' )+str.slice(0, str.lastIndexOf('.'))+'"';
            }
            return str;
        };

    return gulp.src(['dist/js/app/**/*.js'])
        .pipe(revReplace({
            manifest: manifest,
            modifyUnreved: replaceStr,
            modifyReved: replaceStr
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

gulp.task("init", function(){
    return runSequence('clean', 'sync');
});

gulp.task("build", ["init"], function(){
    return runSequence('rev-all', 'scripts-rev-replace', 'scripts-min', 'styles-min');
});
