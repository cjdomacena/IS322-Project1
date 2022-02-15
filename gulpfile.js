const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser')



const compilecss = () =>
{
	return src('src/scss/*.scss')
		.pipe(sass())
		.pipe(prefix())
		.pipe(minify())
		.pipe(dest('dist/css'))
}

const jsmin = () =>
{
	return src('src/js/*.js')
		.pipe(terser())
		.pipe(dest('dist/js'))
}

// Watcher

const watchTask = () => {
	watch('src/scss/*.scss', compilecss);
	watch('src/js/*.js', jsmin)
}

// Default task
exports.default = series(
	compilecss,
	jsmin,
	watchTask
)

