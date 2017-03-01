var gulp 			= require('gulp');
var less 			= require('gulp-less');
var autoprefixer 	= require('gulp-autoprefixer');
var watch 			= require('gulp-watch');
var uglify			= require('gulp-uglify');
var minifyCSS 		= require('gulp-minify-css');
var webpack 		= require('gulp-webpack');
var gutil 			= require('gulp-util');
var rev				= require('gulp-rev');
var ejs 			= require("gulp-ejs");
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('css', function(){
	watch('./src/css/**/*.less', function(){
		gulp.src('./src/css/duck.less')
			.pipe(less())
			.on('error', function(err) {
				gutil.log('Less Error!', err.message);
				this.end();
			})
			//.pipe(rev())
			.pipe(autoprefixer())
			//.pipe(minifyCSS())
			.pipe(gulp.dest('./build'))
			.pipe(reload({stream: true}));
	});
});

gulp.task('html', function(){
	gulp.watch("demos/**/*.html").on('change', reload);
})

gulp.task('js', function(callback){
	watch('./src/js/*.js', function(){
		gulp.src('./src/js/main.js')
			.pipe(webpack({
				watch: true,
				output: {
					filename: '[name].js'
				}
			}))
			.pipe(gulp.dest('./build'));
	});
});

// 文档
gulp.task('doc', function(){
	watch('./src/docs/*.html', function(){
		gulp.src('./src/docs/*.html')
			.pipe(ejs())
			.pipe(gulp.dest('./docs'));
	});
});

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', function(){
	gulp.run(['browser-sync', 'doc', 'css', 'js']);
});
