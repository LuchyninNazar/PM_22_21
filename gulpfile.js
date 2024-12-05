const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Шляхи
const paths = {
    html: './app/**/*.html',
    scss: './app/scss/**/*.scss',
    js: './app/js/**/*.js',
    img: './app/img/**/*',
    data: './app/data/**/*.json',
    dist: {
        base: './dist',
        css: './dist/css',
        js: './dist/js',
        img: './dist/img',
        data: './dist/data',
    },
};

// Завдання для HTML
gulp.task('html', () => {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist.base))
        .pipe(browserSync.stream());
});

// Завдання для SCSS -> CSS
gulp.task('scss', () => {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream());
});

// Завдання для JS
gulp.task('js', () => {
    return gulp.src(paths.js)
        .pipe(terser())
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.stream());
});

// Завдання для оптимізації зображень
gulp.task('images', () => {
    return gulp.src('./app/img/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
        .pipe(browserSync.stream());
});

// Завдання для копіювання JSON-файлів
gulp.task('json', () => {
    return gulp.src(paths.data)
        .pipe(gulp.dest(paths.dist.data))
        .pipe(browserSync.stream());
});

// Завдання для запуску локального сервера
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: paths.dist.base,
        },
        notify: false,
        open: true,
        port: 3000,
    });

    // Відстеження змін у файлах
    gulp.watch(paths.html, gulp.series('html')).on('change', browserSync.reload);
    gulp.watch(paths.scss, gulp.series('scss'));
    gulp.watch(paths.js, gulp.series('js')).on('change', browserSync.reload);
    gulp.watch(paths.img, gulp.series('images'));
    gulp.watch(paths.data, gulp.series('json')).on('change', browserSync.reload); // JSON
});

// Завдання за замовчуванням
gulp.task('default', gulp.series(
    gulp.parallel('html', 'scss', 'js', 'images', 'json'),
    'serve'
));
