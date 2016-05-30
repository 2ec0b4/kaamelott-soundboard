var gulp = require('gulp');
var rev = require('gulp-rev');

gulp.task('default', function () {
    return gulp.src(['js/app/*.js', 'js/app/*/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});
