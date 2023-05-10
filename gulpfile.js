const { src, dest, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));

const scripts = () => src('app/js/main.js')
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())

const styles = () => src('app/scss/styles.scss')
  .pipe(concat('styles.min.css'))
  .pipe(scss({ outputStyle: 'compressed' }))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())

const watching = () => {
  watch(['app/scss/styles.scss'], styles)
  watch(['app/js/main.js'], scripts)
  watch(['app/*.html']).on('change', browserSync.reload)
};

const browsersync = () => browserSync.init({
  server: {
    baseDir: 'app/'
  }
})

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(styles, scripts, browsersync, watching);