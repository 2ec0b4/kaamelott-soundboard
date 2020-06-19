var gulp            = require('gulp'),
    uglify          = require('gulp-uglify'),
    cssnano         = require('gulp-cssnano'),
    del             = require('del'),
    syncy           = require('syncy'),
    runSequence     = require('run-sequence'),
    RevAll          = require('gulp-rev-all'),
    revReplace      = require('gulp-rev-replace'),
    revDel          = require('gulp-rev-delete-original'),
    Path            = require('path');
    Tool            = require('./node_modules/gulp-rev-all/tool.js');
    nonFileNameChar = '[^a-zA-Z0-9\\.\\-\\_\\/]',
    qoutes          = '\'|"';

function referenceToRegexs(reference) {
    var escapedRefPathBase = Tool.path_without_ext(reference.path).replace(/([^0-9a-z])/ig, '\\$1'),
        escapedRefPathExt = Path.extname(reference.path).replace(/([^0-9a-z])/ig, '\\$1'),
        isJSReference = reference.path.match(/\.js$/),
        isHBSReference = reference.path.match(/\.hbs$/),
        regExps = [],
        regExp;

    if (isJSReference) {
        regExp = '(data-main=(?:'+ qoutes +'))(' + escapedRefPathBase + ')()('+ qoutes + '|$)';
        regExps.push(new RegExp(regExp, 'g'));
        regExp = '((?:define|require)\\\(['+ qoutes +'])(' + escapedRefPathBase.replace(/\\\/js\\\/app\\\//ig, '') + ')()(['+ qoutes +'](?:\\\)|,))';
        regExps.push(new RegExp(regExp, 'g'));
    } else if(isHBSReference) {
        regExp = '(require\\\(['+ qoutes +']hbs!)(' + escapedRefPathBase.replace(/\\\/js\\\/app\\\//ig, '') + ')()(['+ qoutes +']\\\))';
        regExps.push(new RegExp(regExp, 'g'));
    }

    regExp = '('+ nonFileNameChar +')(' + escapedRefPathBase + ')(' +  escapedRefPathExt + ')('+ nonFileNameChar + '|$)';
    regExps.push(new RegExp(regExp, 'g'));

    return regExps;
}

gulp.task("rev-all", function(){
    var revAll  = new RevAll({
        dontGlobal: [/^\/favicons\/favicon\.ico$/g, /^\/sounds\/(.+)\.mp3/g],
        dontRenameFile: [/^\/.+\.html/g, /^\/robots\.txt/g, /^\/img\/ks\.jpg/g],
        referenceToRegexs: referenceToRegexs,
        transformPath: function (rev, source, path) {
            if( source.match(/main/) ) {
                return rev;
            }

            return rev.replace('/js/app/', '');
        }
    });

    return gulp.src(['dist/**', '!dist/bower_components/**'])
        .pipe(revAll.revision())
        .pipe(revDel())
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
    syncy(['@(.htaccess)', 'bower_components/**', 'css/**', 'favicons/**', 'img/**', 'js/**', '*.html', '@(manifest.json)', '@(robots.txt)', 'sounds/**'], 'dist', {
        updateAndDelete: true
    }).then(() => {
        console.log('Synchronized!');
    })
    .catch(console.error);
});

gulp.task("init", function(){
    return runSequence('clean', 'sync');
});

gulp.task("build", function(){
    return runSequence('rev-all', 'scripts-rev-replace', 'scripts-min', 'styles-min');
});
