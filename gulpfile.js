const {
  src, dest, watch, parallel, series,
} = require('gulp');
const concat = require('gulp-concat');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const include = require('gulp-include');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));

// HTML

const html = () => src('app/*.html')
  .pipe(include({
    includePaths: 'app/html',
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());

// Styles

const styles = () => src('app/scss/styles.scss', { sourcemaps: true })
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
  }))
  .pipe(concat('styles.min.css'))
  .pipe(scss({ outputStyle: 'compressed' }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream());

// Scripts

const scripts = () => src('app/js/main.js', { sourcemaps: true })
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream());

// Images

const images = () => src(['app/assets/images/*.*', '!app/assets/images/icons'])
  .pipe(newer('dist/assets/images'))
  .pipe(avif({ quality: 50 }))
  .pipe(dest('dist/assets/images'))

  .pipe(src('app/assets/images/src/*.*'))
  .pipe(newer('dist/assets/images'))
  .pipe(webp())
  .pipe(dest('dist/assets/images'))

  .pipe(src('app/assets/images/src/*.*'))
  .pipe(newer('dist/assets/images'))
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    optimizationLevel: 3,
  }))
  .pipe(dest('dist/assets/images'));

// SVG

const svg = () => src(['app/assets/images/icons/*.svg'])
  .pipe(svgmin())
  .pipe(dest('dist/assets/images/icons'));

// Fonts

const otfToTtf = () => src('app/assets/fonts/*.otf')
  .pipe(fonter({
    formats: ['ttf'],
  }))
  .pipe(dest('app/assets/fonts'));

const ttfToWoff = () => src('app/assets/fonts/*.ttf', {})
  .pipe(fonter({
    formats: ['woff'],
  }))
  .pipe(dest('dist/assets/fonts/*'))

  .pipe(src('app/assets/fonts/*.ttf'))
  .pipe(ttf2woff2())
  .pipe(dest('dist/assets/fonts/'));

// Some for app

const watching = () => {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    },
  });
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/assets/images/**', '!app/assets/images/icons'], images);
  watch(['app/assets/images/icons/*.svg'], svg);
  watch(['app/js/main.js'], scripts);
  watch(['app/html/*', 'app/*.html'], html);
  watch(['app/*.html']).on('change', browserSync.reload);
};

const cleaner = () => src('dist', { allowEmpty: true }).pipe(clean());

exports.build = series(
  cleaner,
  otfToTtf,
  ttfToWoff,
  parallel(
    styles,
    images,
    html,
    scripts,
    svg,
  ),
);

exports.default = series(
  cleaner,
  parallel(
    styles,
    images,
    html,
    scripts,
    svg,
  ),
  series(
    watching,
  ),
);
