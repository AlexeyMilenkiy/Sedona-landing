var gulp = require('gulp');

var browserSync = require('browser-sync').create();

var less = require('gulp-less');

gulp.task('less', function(){

	return gulp.src('./less/main.less')
	       .pipe(less())
	       .pipe(gulp.dest('./style'))
	       .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('less', function(){
       
       browserSync.init({

       	server: {baseDir: './'}
       })

	gulp.watch('./index.html').on('change', browserSync.reload);

    gulp.watch('./style/*.css').on('change', browserSync.reload);

    gulp.watch('./style/media/*.css').on('change', browserSync.reload);
    
    gulp.watch('./less/*.less', gulp.series('less'));

}));

