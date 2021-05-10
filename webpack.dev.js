module.exports = {
  mode: 'development',
  entry: {
    index: ['./source/js/carousel.js'],
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
  },
};
