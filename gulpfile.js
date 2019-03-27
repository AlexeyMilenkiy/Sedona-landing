var gulp = require('gulp');

var browserSync = require('browser-sync').create();

var less = require('gulp-less');

var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');

gulp.task('less', function(){

	return gulp.src('./less/main.less')
	       .pipe(less({includePaths: require('node-normalize-scss').includePaths}))
	       .pipe(gulp.dest('./style/dest'))
	       .pipe(browserSync.stream());
});

gulp.task('css', function () {
 var processors = [autoprefixer];
  return gulp.src('./style/dest/*.css')
         .pipe(postcss(processors))
         .pipe(gulp.dest('./style'))
         .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('less', 'css', function(){
       
       browserSync.init({

       	server: {baseDir: './'}
       })

	gulp.watch('./index.html').on('change', browserSync.reload);

    gulp.watch('./style/*.css').on('change', browserSync.reload);

    gulp.watch('./style/media/*.css').on('change', browserSync.reload);
    
    gulp.watch('./less/*.less', gulp.series('less'));

}));

