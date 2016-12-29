const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './app.js'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, '/src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
        include: path.join(__dirname, '/src')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  }
};
module.exports = config;
