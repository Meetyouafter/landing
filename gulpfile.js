const {
  src, dest, watch, parallel, series,
} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));

const scripts = () => src('src/js/main.js')
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('src/js'))
  .pipe(browserSync.stream());

const styles = () => src('src/scss/styles.scss')
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
  }))
  .pipe(concat('styles.min.css'))
  .pipe(scss({ outputStyle: 'compressed' }))
  .pipe(dest('src/css'))
  .pipe(browserSync.stream());

const html = () => src('src/*.html')
  .pipe(dest('dist'));

const watching = () => {
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/js/main.js'], scripts);
  watch(['src/*.html']).on('change', browserSync.reload);
};

const browsersync = () => browserSync.init({
  server: {
    baseDir: 'src/',
  },
});

const cleaner = () => src('dist').pipe(clean());

const building = () => src([
  'src/css/styles.min.css',
  'src/js/main.min.js',
  'src/**/*.html',
], { base: 'src' })
  .pipe(dest('dist'));

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleaner, building);

exports.default = parallel(styles, scripts, html, browsersync, watching);
