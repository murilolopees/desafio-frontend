let mix = require('laravel-mix');

mix
    .setPublicPath('dist/')
    .js('./src/js/page/mainPage.js', 'dist/page/mainPage.js')
    .sass('./src/style/sass/main.scss', 'dist/main.css').options({
        processCssUrls: false,
    }).version();