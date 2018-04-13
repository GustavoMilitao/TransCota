var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('default', function () {
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 9000,
      livereload: true,
      open: 'http://localhost:9000/public',
      fallback: 'index.html'
    }));
});

gulp.task('serve', ['default']);

gulp.task('config',function(){
  var env = process.argv[3] || process.argv[2] || '--dev';
  return gulp.src('config.json')
  .pipe(gulpNgConfig('config',{
    environment:env.substring(2)
  }))
  .pipe(gulp.dest('./public'))
})