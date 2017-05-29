const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const relative = p => path.resolve(__dirname, p)

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: [
      'whatwg-fetch',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
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
  plugins: [
    new CopyWebpackPlugin([{
      from: 'ead./node_modules/semantic-ui-css/**/*',
      to: '/',
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}
