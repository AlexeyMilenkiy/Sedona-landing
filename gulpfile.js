
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const realFavicon = require('gulp-real-favicon');
const fs = require('fs');
const FAVICON_DATA_FILE = 'faviconData.json';
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const rename = require('gulp-rename');

gulp.task('less', () => gulp.src(['./style/less/*.less'])
  .pipe(less())
  .pipe(concat('main.css'))
  .pipe(gulp.dest('./style/dest'))
  .pipe(browserSync.stream()));

gulp.task('css', () => {
  const processors = [autoprefixer({ browsers: ['last 1 version'] })];

  return gulp.src('./style/dest/main.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./style/'))
    .pipe(browserSync.stream());
});

gulp.task('browserify', () => {
  const bundleStream = browserify('./js/script.js').bundle();

  return bundleStream
    .pipe(source('script.js'))
    .pipe(streamify(babel()))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('less', 'css', 'browserify', () => {
  browserSync.init({
    files: ['./index.html', './slider.html'],
    server: {
      baseDir: './',
      port: 3000
    }
  });

  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./style/main.css').on('change', browserSync.reload);
  gulp.watch('./js/script.js').on('change', gulp.series('browserify'), browserSync.reload);
  gulp.watch('./style/less/*.less', gulp.series('less'));
  gulp.watch('./style/dest/*.css', gulp.series('css'));
}));

gulp.task('generate-favicon', (done) => {
  realFavicon.generateFavicon({
    masterPicture: './img/logotype-tablet.png',
    dest: './img/icons',
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '21%'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#da532c',
        onConflict: 'override'
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#ffffff',
        manifest: {
          name: 'Distillery',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override'
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      compression: 5,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, () => {
    done();
  });
});

gulp.task('inject-favicon-markups', () => {
  gulp.src(['./*.html'])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('./'));
});

gulp.task('check-for-favicon-update', (done) => {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, (err) => {
    if (err) {
      throw err;
    }
  });
});
