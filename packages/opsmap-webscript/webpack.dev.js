const path = require('path')

const relative = p => path.resolve(__dirname, p)

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: [
      'whatwg-fetch',
      relative('./src/index.js'),
    ],
  },
  output: {
    path: relative('./build'),
    filename: '[name].bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        relative('./src'),
      ],
      loader: 'babel-loader',
    }],
  },
}
