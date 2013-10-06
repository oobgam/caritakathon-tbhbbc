set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'

activate :autoprefixer
activate :livereload

configure :build do
  activate :minify_css
end

require './contact'
use Contact