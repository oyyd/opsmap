const path = require('path')

const relative = p => path.resolve(__dirname, p)

module.exports = {
  entry: {
    index: ['whatwg-fetch', relative('./src/index.js')],
  },
  output: {
    path: relative('./build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        relative('./src'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.less$/,
      use: [{
        // creates style nodes from JS strings
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
      }],
    }],
  },
  devtool: 'source-map',
}
