module.exports = {
  mode: 'development',
  entry: {
    index: ['./source/js/menu.js', './source/js/header-region.js', './source/js/form.js'],
    procedure: ['./source/js/menu.js', './source/js/procedure-tabs.js', './source/js/form.js', './source/js/carousel.js'],
    contact: ['./source/js/menu.js', './source/js/header-region.js'],
    blank: ['./source/js/menu.js', './source/js/header-region.js', './source/js/blank.js'],
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
  },
};
