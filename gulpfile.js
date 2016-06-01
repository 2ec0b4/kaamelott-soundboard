var gulp = require('gulp'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    uglify = require('gulp-uglify');

gulp.task("revision", function(){
  return gulp.src(['js/app/*.js', 'js/app/*/*.js'])
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'));
})

gulp.task("replace", function(){
  var manifest = gulp.src("./dist/rev-manifest.json");

  return gulp.src(['dist/*.js', 'dist/*/*.js'])
    .pipe(revReplace({
        manifest: manifest,
        modifyUnreved: function(str) {
            return '"'+str.slice(0, 3)+'"';
        },
        modifyReved: function(str) {
            return '"'+str.slice(0, 3)+'"';
        }
    }))
    .pipe(gulp.dest('dist'));
});
