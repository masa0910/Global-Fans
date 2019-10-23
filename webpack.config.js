const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const CORDOVA_ENV = process.env.CORDOVA_ENV || 'development'

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    index: path.join(__dirname, 'www', 'js', 'react', 'index'),
  },
  output: {
    path: path.join(__dirname, 'www', 'js'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react', 'stage-1'],
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'www', 'html', 'index.html'),
      filename: path.join(__dirname, 'www', 'index.html'),
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env.CORDOVA_ENV': JSON.stringify(CORDOVA_ENV)
    }),
  ],
}
