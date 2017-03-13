import gulp from 'gulp';
import babel from 'gulp-babel';
import sequence from 'run-sequence';
import del from 'del';

gulp.task('default', done => sequence(['clean'], ['build'], done));

gulp.task('clean', () => del(['lib']));

gulp.task('build', ['build:lib']);

gulp.task('build:lib', () => {
	return gulp.src(['src/**/*.js'])
		.pipe(babel())
		.pipe(gulp.dest('lib'));
});
