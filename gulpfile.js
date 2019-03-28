var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var order = require('gulp-order');

gulp.task('less', function(){

	return gulp.src(['./less/variables.less', 
                   './less/mixines.less', 
                   './less/header.less', 
                   './less/main-first-block.less',
                   './less/main-second-block.less',  
                   './less/footer.less'])
	       .pipe(less())
         .pipe(concat('main.css'))
	       .pipe(gulp.dest('./style/dest'))
	       .pipe(browserSync.stream());
});

gulp.task('css', function () {
 var processors = [autoprefixer];
  return gulp.src('./style/dest/main.css')
         .pipe(postcss(processors))
         .pipe(gulp.dest('./style/'))
         .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('less', 'css', function(){
       
       browserSync.init({

       	server: {baseDir: './'}
       })

	gulp.watch('./index.html').on('change', browserSync.reload);

    gulp.watch('./style/main.css').on('change', browserSync.reload);
 
    gulp.watch('./less/*.less', gulp.series('less'));
    gulp.watch('./style/dest/*.css', gulp.series('css'));

}));

