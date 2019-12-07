const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
  src: {
    images: './src/images/*',
  	html: './src/*.html',
    sass: './src/main.scss',
    robots: './src/robots.txt',
  },
  dist: {
  	root: './dist',
  	public: './dist/public'
  }
};

function clean() {
  return del(paths.dist.root);
}

function html() {
	return gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.dist.root));
}

function robots() {
  return gulp.src(paths.src.robots)
    .pipe(gulp.dest(paths.dist.root));
}

function images() {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dist.public));
}

function styles() {
	return gulp.src(paths.src.sass)
		.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.dist.public));
}

module.exports = { clean, html, robots, images, styles };

const build = gulp.series(clean, gulp.parallel(html, robots, images, styles));

gulp.task('build', build);
gulp.task('default', build);
