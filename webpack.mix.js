let mix = require('laravel-mix');

mix.js('assets/js/app.js', 'public/js/')
    .autoload({
        jquery: ['$', 'jQuery', 'window.$', 'window.jQuery']
    })
   .sass('assets/sass/app.scss', 'public/css/')
   .setPublicPath('public');

if (mix.inProduction) {
   mix.version();
}