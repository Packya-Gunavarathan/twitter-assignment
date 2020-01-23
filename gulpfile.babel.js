import { src, dest , watch, series, lastRun } from 'gulp'
import sass from 'gulp-sass'
import nodeSass from 'node-sass'
import cssNano from 'gulp-cssnano'
import postCss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import concat from 'gulp-concat'
import mode from 'gulp-mode'
import del from 'del'




sass.compiler = nodeSass;
/*
export const cleanupCssFiles = (file, opts) => {
    return del([ config.styles.dest ]);

};*/

export const compileScss = () => {

    let plugins = [
        autoprefixer,
        cssNano
    ];

    return src('./webapps/scss/**/*.scss', {'sourcemaps': !!mode().development()})
        .pipe(sass().on('error', sass.logError))
        .pipe(postCss(plugins))
        .pipe(concat("app.min.css"))
        .pipe(dest('./dist/css', mode().development({ sourcemaps: "." })));

};


exports.compileScss = series(compileScss)
