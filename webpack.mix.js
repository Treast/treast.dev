const mix = require('laravel-mix');

mix
  .disableNotifications()
  .sass('src/app.scss', 'dist/app.css')
  .js('src/app.js', 'dist/app.js')
  .minify(['dist/app.js', 'dist/app.css'])
  .copy('src/index.html', 'dist/index.html')
  .copyDirectory('src/assets', 'dist/assets')
  .browserSync({
    watch: true,
    server: './dist',
  });
