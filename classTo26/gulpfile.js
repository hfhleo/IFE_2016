var gulp = require('gulp');

var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');



//静态服务器
gulp.task('browser-sync', function() {
    browserSync({
        files:'**',
        server: {
            baseDir: './../'
        }
    })
}); 

gulp.task('default', ['browser-sync']);


