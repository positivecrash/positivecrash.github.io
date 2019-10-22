//load plugins
var gulp             = require('gulp'),
    compass          = require('gulp-compass'),
    pug              = require('gulp-pug'),
    autoprefixer     = require('gulp-autoprefixer'),
    cleancss         = require('gulp-clean-css'),
    uglify           = require('gulp-uglify'),
    merge            = require('merge-stream'),
    rename           = require('gulp-rename'),
    concat           = require('gulp-concat'),
    
    ttf2eot          = require('gulp-ttf2eot'),
    ttf2woff         = require('gulp-ttf2woff'),

    iconfont         = require('gulp-iconfont');


var path = {

    file:{
        csscompile: 'app/css/compile.scss',
        cssall: 'app/css/**/*.scss',
        jsall: 'app/js/**/*.js',
        layoutscompile: 'app/posts/*.pug',
        layoutsall: 'app/posts/**/*.pug',
        fonticons: 'app/fonticons/*.svg'
    },

    folder:{
        css: 'dist/assets/css/',
        fonts: 'dist/assets/fonts/',
        sass: 'app/css/',
        image: 'dist/assets/i/',
        js: 'dist/assets/js/',
        layouts: 'dist/',
        csstemplates: 'app/css/templates/'
    },

    filename:{
        css: 'positivecrash',
        js: 'positivecrash.js',
        fonticons: 'iconfont'
    }

}


gulp.task('css', function() {
    return gulp.src([path.file.csscompile])
        .pipe(compass({
            css: path.folder.css,
            sass: path.folder.sass,
            image: path.folder.image,
            font: path.folder.fonts
        }))
        .pipe(gulp.dest(path.folder.css))
        .pipe(cleancss({
          compatibility: 'ie8'
        }))
        .pipe(rename({
            basename: path.filename.css,
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.folder.css));
});




gulp.task('js', function() {
	return gulp.src([path.file.jsall])
		.pipe(concat(path.filename.js))
		.pipe(gulp.dest(path.folder.js))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(path.folder.js));
});


gulp.task('layouts', function() {
  return gulp.src([path.file.layoutscompile])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.folder.layouts));
});



gulp.task('iconfont', function(){
    return gulp.src([path.file.fonticons])
    .pipe(iconfont({
      fontName: path.filename.fonticons, // required
      formats: ['ttf', 'eot', 'woff'],
      normalize: true,
      fontHeight: 1000,
      prependUnicode: true
     }))
    .pipe(gulp.dest(path.folder.fonts));
});


// Watch
gulp.task('watch', function() {

	//watch .scss files
	gulp.watch(path.file.cssall, ['css']);

	//watch .js files
	gulp.watch(path.file.jsall, ['js']);

	// //watch .pug files
	gulp.watch(path.file.layoutsall, ['layouts']);

    // font icons
	gulp.watch(path.file.fonticons, ['iconfont']);

});


//default
gulp.task('default', ['css', 'js', 'layouts', 'iconfont', 'watch']);
