const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');

const scripts = require('./scripts'); //scripts.json, all dependency scripts like angularjs
const styles = require('./styles'); //styles.json, all dependency styles like fontawesome

gulp.task("css", function() {
    return gulp.src("./src/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("js", function() {
    return gulp.src("./src/**/*.js")
        .pipe(concat("scripts.js"))
        .pipe(babel({
                presets: ['env']
            }))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("scripts", function() {
   return gulp.src(scripts)
        .pipe(concat("app.js"))
        .pipe(gulp.dest("./dist/js"))     
});

gulp.task("html", function() {
    return gulp.src("./src/**/*.html")
        .pipe(concat("index.html"))
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("build", function() {
    gulp.start(['css', 'scripts', 'js', 'html']);
});

gulp.task('browserSync', function(){
    browserSync.init(null, {
        open: false,
        server: ['./dist', './dist/css', './dist/js']
    });
});

gulp.task("default", ['build', 'browserSync'], function(){
    gulp.watch(['./src/scss/**/*.scss'], ['css']);
    gulp.watch(['./src/js/**/*.js'], ['js']);
    gulp.watch(['./src/**/*.html'], ['html']);
});