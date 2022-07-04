const gulp = require("gulp");
const clean = require("gulp-clean");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postCss");
const cssnano = require("cssnano");
const ts = require("gulp-typescript");
const uglify = require("gulp-uglify");
const browsersync = require("browser-sync").create();
const webpack = require("gulp-webpack");
const nodemon = require("gulp-nodemon");
const webpackConfig = require("./webpack.config");

const tsProject = ts.createProject("tsconfig.json");

// Removes previous dist task
gulp.task("start", () => gulp.src("dist", { allowEmpty: true }).pipe(clean()));

// Copy Images task
gulp.task("copy-images", () => gulp.src("src/images/**").pipe(gulp.dest("dist/images")));

// Copy Server task
gulp.task("copy-server", () => gulp.src("src/server/**").pipe(gulp.dest("dist/server")));

// HTML task
gulp.task("html", () => gulp.src("src/client/*.html").pipe(gulp.dest("dist/client")));

// Sass task
gulp.task("sass", () =>
	gulp
		.src("src/client/styles/*.scss")
		.pipe(sass())
		.pipe(postcss([cssnano()]))
		.pipe(gulp.dest("dist/client/styles"))
		.pipe(browsersync.stream())
);

// Typescript task
gulp.task("ts", () => gulp.src("src/client/scripts/*.ts").pipe(tsProject()).pipe(gulp.dest("dist/client/js")));

// Webpack task
gulp.task("webpack", () => webpack(webpackConfig).pipe(uglify()).pipe(gulp.dest("dist/client")));

// Watch task
gulp.task("watch", () => {
	gulp.watch("src/images", gulp.series("copy-images", "browsersyncReload"));
	gulp.watch("src/server", gulp.series("copy-server"));
	gulp.watch("src/client/*.html", gulp.series("html", "browsersyncReload"));
	gulp.watch("src/client/styles/*.scss", gulp.series("sass"));
	gulp.watch("src/client/scripts/*.ts", gulp.series("ts", "webpack", "browsersyncReload"));
});

// Server nodemon task
gulp.task("nodemon", () => {
	var stream = nodemon({
		script: "dist/server/server.js",
		ext: ".js",
		ignore: ["node_modules/", "dist/client", "src/", "gulpfile.js", "webpack.config.js"],
	});
	stream
		.on("start", () => {
			console.log("Starting server");
			setTimeout(() => gulp.series("browsersyncReload")(), 1500);
		})
		.on("restart", () => console.log("restarting server"));
});

// Browser sync tasks
gulp.task("browsersyncServe", (cb) => {
	console.log("reloading browser");
	browsersync.init({
		proxy: "http://localhost:3000",
		port: 5500,
	});
	cb();
});

gulp.task("browsersyncReload", (cb) => {
	browsersync.reload();
	cb();
});

// Default task
gulp.task("default", gulp.series("start", "copy-images", "copy-server", "ts", "webpack", "sass", "html", "browsersyncServe", gulp.parallel("watch", "nodemon")));
