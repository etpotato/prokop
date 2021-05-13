module.exports = {
  mode: 'development',
  entry: {
    index: [
      './source/js/carousel.js',
      './source/js/api.js',
      './source/js/form.js',
    ],
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
  },
};
