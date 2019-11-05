const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');

gulp.task("default", ["styles", "lint"], function() {
    gulp.watch("sass/**/*.scss", ["styles"]);
    gulp.watch('js/**/*.js', ['lint']);
});

gulp.task("styles", function() {
    gulp
      .src("sass/**/*.scss")
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(
        autoprefixer({
            browsers: ["last 2 versions"]
        })
      )
      .pipe(gulp.dest("./css"));
});

gulp.task('lint', function() {
    return (
        gulp
            .src(['js/**/*.js'])
            // eslint() attaches the lint output to the eslint property
            // of the file object so it can be used by other modules.
            .pipe(eslint())
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failOnError last.
            .pipe(eslint.failOnError())
    );
});