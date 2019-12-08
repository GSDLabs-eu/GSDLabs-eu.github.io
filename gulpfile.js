const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const paths = {
  src: {
    root: './src',
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

// BUILD

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
    .pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulp.dest(paths.dist.public));
}

const build = gulp.series(clean, gulp.parallel(html, robots, images, styles));

// DEVELOPMENT SERVER

function server() {
  browserSync.init({
    port: 10530,
    server: {
      baseDir: "./dist",
    },
    ui: {
      port: 10531
    },
    open: false
  });
}

function watchAndReload() {
  return gulp.watch(paths.src.root, gulp.series(build, browserSync.reload))
};

gulp.task('dev-server', gulp.series(build, gulp.parallel(server, watchAndReload)));
gulp.task('build', build);
gulp.task('default', build);