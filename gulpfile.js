"use strict";
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const cssnano = require("cssnano");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const path = {
  dist: {
    html: "./dist/",
    js: "./dist/js/",
    css: "./dist/css/",
    img: "./dist/img/"
  },
  src: {
    html: "./src/*.html",
    js: "./src/js/*.js",
    sass: "./src/sass/**/*.scss",
    img: "./src/img/**/*.{jpg,jpeg,png,gif,svg}"
  },
  watch: {
    html: "./src/**/*.html",
    js: "./src/js/**/*.js",
    sass: "./src/sass/**/*.scss",
    img: "./src/img/**/*.*"
  }
};
gulp.task("html", () =>
  gulp
    .src(path.src.html)
    .pipe(
      htmlmin({
        collapseWhitespace: false,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeAttributeQuotes: true
      })
    )
    .pipe(gulp.dest(path.dist.html))
);

gulp.task("sass", () => {
  const plugins = [
    cssnext({
      browserslist: [
        "> 1%",
        "last 5 versions",
        "ie>10"
      ],
      warnForDuplicates: false
    }),
    cssnano({
      preset: ["advanced", {
        autoprefixer: false,
      }],
    })
  ];
  gulp
    .src(path.src.sass)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(path.dist.css));
});
gulp.task("js", () => {
  gulp.src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write(".")) 
    .pipe(gulp.dest(path.dist.js));
});
gulp.task("img", () =>
  gulp
    .src(path.src.img)
    .pipe(gulp.dest(path.dist.img))
);

gulp.task("build", ["html", "sass", "js", "img"]);

gulp.task("default", () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    browser: "chrome"
  });
  gulp.watch(path.watch.sass, ["sass"]);
  gulp.watch(path.watch.js, ["js"]);
  gulp.watch(path.watch.img, ["img"]);
  gulp.watch(path.watch.html, ["html"]);
  gulp.watch(path.dist.html, reload);
  gulp.watch(path.dist.js, reload);
  gulp.watch(path.dist.css, reload);
  gulp.watch(path.dist.img, reload);
});