/**
 * Created by yumeer on 2016/8/23.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude  = require('gulp-file-include'),
    inject = require('gulp-inject'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    runSequence = require('run-sequence'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');


/*var BUILD_HOST ="http://localhost:10240/mast";*/
var BUILD_HOST = "http://mast.yumeer.com:20002";

gulp.task('clean',function() {
    return del(['dist/*']);
});


gulp.task('clean-tmp',function() {
    return del(['dist/tmp']);
});


gulp.task('inject-less-viriable', function(){
    var replaceCss = gulp.src(['src/css/lib/*.css'], {read: false});
    return gulp.src(['src/css/host.less'])
        .pipe(inject(replaceCss, {starttag: '/* inject:host:css */', transform: function (filePath) {return '@ym-static-host: "' + BUILD_HOST + '";';}}))
        .pipe(gulp.dest('src/css/less'))
});


gulp.task('build-less',['inject-less-viriable'], function() {
    return gulp.src('src/css/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(concat('index.css'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('dist/tmp'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/tmp'));
});


gulp.task('clean-host',function() {
    return del(['src/css/less/host.less']);
});


gulp.task('build-css',['clean-host'],function() {
    return gulp.src(['dist/tmp/index-*.css', 'src/css/lib/normalize.css'])
        .pipe(concat('index.css'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/tmp'));
});


gulp.task('copy-lib-css', ['clean-host'], function() {
    return gulp.src(['src/css/fontface/*/*','src/css/fontface/*/*/*'])
        .pipe(gulp.dest('dist/fontface'));
});


gulp.task('build-js', function() {
    return gulp.src(['src/js/*'])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});


gulp.task('copy-lib-js', function() {
    return gulp.src(['src/js/*/*'])
        .pipe(gulp.dest('dist/js'));
});


gulp.task('build-image', function() {

    return gulp.src(['src/images/*.{png,jpg,gif,ico}','src/images/*/*.{png,jpg,gif,ico}'])
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('build-html', function() {
    var commonCss = gulp.src(['dist/index-*.css'], {read: false});
    var commonJs = gulp.src(['dist/js/lib/jquery-3.1.0.min.js','dist/js/lib/handlebars-v4.0.5.js','dist/js/lib/jquery.validate.min.js','dist/js/lib/jquery.cookie.js', 'dist/js/config.js', 'dist/js/lib/vue.js', 'dist/js/lib/socket.io-1.3.5.min.js', 'dist/js/lib/yunba-js-sdk.js','dist/js/lib/slick.min.js','dist/js/lib/fingerprint.js'], {read: false});
    var mainJs = gulp.src(['dist/index-*.js'], {read: false});

    return gulp.src('src/html/*.html')
        .pipe(inject(commonCss, {starttag: '<!-- inject:commoncss:{{ext}} -->',addPrefix:BUILD_HOST, transform: function (filePath) {return '<link rel="stylesheet" href="' + filePath.substring(1) + '">';}}))
        .pipe(inject(commonJs, {starttag: '<!-- inject:commoncjs:{{ext}} -->',addPrefix:BUILD_HOST, transform: function (filePath) {return '<script src="' + filePath.substring(1) + '"></script>';}}))
        .pipe(inject(mainJs, {starttag: '<!-- inject:mainjs:{{ext}} -->',addPrefix:BUILD_HOST, transform: function (filePath) {return '<script src="' + filePath.substring(1) + '"></script>';}}))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('build-all-dev', function(callback) {
    runSequence('clean','build-less','build-css','build-js','build-image','copy-lib-css','copy-lib-js','build-html','clean-tmp',
        callback);
});


gulp.task('build-all-pro', function(callback) {

    BUILD_HOST = /*"http://localhost:10240/mast"*/"http://mast.yumeer.com:20002";

    runSequence('clean','build-less','build-css','build-js','build-image','copy-lib-css','copy-lib-js','build-html','clean-tmp',
        callback);
});


gulp.task('watch',function(){
    gulp.watch(['src/css/*.less','src/css/*/*.*'],['build-all-dev']);
});

gulp.task('watch-html',function(){
    gulp.watch(['src/html/*.html','src/html/*/*.*'],['build-html']);
});
