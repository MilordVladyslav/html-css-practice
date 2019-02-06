
var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
concat = require('gulp-concat'),
uglify = require('gulp-uglifyjs')
cssnano = require('gulp-cssnano'),
rename = require('gulp-rename'),
del = require('del'),
imagemin = require('gulp-imagemin'),
//  pngquant = require('imagemin-pngquant'),
cache = require('gulp-cache'),
autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', function () {
return gulp.src('app/scss/all.scss') 
.pipe(sass())
.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
.pipe(gulp.dest('app/css'))
.pipe(browserSync.reload({stream: true}))
})


gulp.task('scripts', function () {
return gulp.src([
]) 
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
})

gulp.task('styles', ['sass', 'css-images', 'fonts'], function () {
return gulp.src([
    'node_modules/reset-css/reset.css',
]) 
    .pipe(concat('libs.css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
})
gulp.task('fonts', function () {
return gulp.src([
    'app/libs/bootstrap/fonts/*'
])
    .pipe(gulp.dest('app/fonts'))
})

gulp.task('browser-sync', function () {
browserSync({
    server: {
        baseDir: 'app',
        notify: false
    }
})
})

gulp.task('clean', function () {
return del.sync('dist')
})

gulp.task('clear-cache', function () {
return cache.clearAll()
})

gulp.task('img', function () {
return gulp.src([
    'app/img/**/*'
])
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgPlugins: [{removeViewBox: false}]
    //  une: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('css-images', function () {
return gulp.src([
    'app/libs/slider-pro/dist/css/images/*'
])
    .pipe(gulp.dest('app/css/images'))
})

gulp.task('watch', ['browser-sync', 'styles', 'scripts'], function () {
gulp.watch('app/scss/**/*.scss', ['sass'])
gulp.watch('app/**/*.html', browserSync.reload)
gulp.watch('app/js/**/*.js', browserSync.reload)
})

gulp.task('build', ['clean', 'styles', 'scripts', 'img'], function () {
var buildHtml = gulp.src([
        'app/*.html',
    ])
    .pipe(gulp.dest('dist'))
    buildCss = gulp.src([
        'app/css/all.css',
        'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css')),
    buildCssImages = gulp.src([
        'app/css/img/*'
    ])
        .pipe(gulp.dest('dist/css/images')),
    buildFonts = gulp.src([
        'app/fonts/**/*',
    ])
    .pipe(gulp.dest('dist/fonts')),
    buildJs = gulp.src([
        'app/js/**/*',
    ])
    .pipe(gulp.dest('dist/js'))
    
})
