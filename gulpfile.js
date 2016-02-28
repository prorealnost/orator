/* Load plugins */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  notify = require('gulp-notify'),
  connect = require('gulp-connect');

gulp.task('connectBuild', function() {
  connect.server({
    root: '_site',
    port: 8000,
    livereload: true
  });
});

gulp.task('css', function() {
  return gulp.src('./_sass/*.scss')
    .pipe( sass() )
    .pipe( gulp.dest('./_site') )
    .pipe( connect.reload() )
    .pipe( notify('CSS task complete!') )
});

gulp.task('js', function() {
  return gulp.src('./js/*.js')
    .pipe( gulp.dest('./_site/js') )
    .pipe( connect.reload() )
    .pipe( notify('JS task complete!') )
});

gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe( connect.reload() )
    .pipe( gulp.dest('./_site') )
});

gulp.task('images', function() {
  return gulp.src(['./images/**/*'])
    .pipe( connect.reload() )
    .pipe( gulp.dest('./_site/images') )
});

gulp.task('vendor', function() {
  return gulp.src(['./vendor/**/*'])
    .pipe( connect.reload() )
    .pipe( gulp.dest('./_site/vendor') )
});

/* Default task */
gulp.task('default', ['connectBuild', 'watch'], function() {
  gulp.start('css', 'js', 'html', 'images', 'vendor');
});

/* Watch task */
gulp.task('watch', function() {
  gulp.watch('./_sass/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./images/*', ['images']);
  gulp.watch('./*.html', ['html']);
});

// for i in {1..8}; do convert learn-icon-$i.png -gravity center -background none -extent 165x165 learn-icon-$i-extend.png; done
