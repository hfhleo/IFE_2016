var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

//css
gulp.task('css', function(){
    return sass('src/scss/*.scss', { style: 'expanded',noCache: true, sourcemap: false})
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

//浏览器实时刷新
gulp.task('browser-sync', function() {
    browserSync({
        files:'**',
        server: {
            baseDir: './'
        }
    })
}); 

gulp.task('default', ['browser-sync']);
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['css']); 
})