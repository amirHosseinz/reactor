var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './buildim/components');
var APP_DIR = path.resolve(__dirname, './src');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2016' ,'react']
        },
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      },
      {
        test: /\.html$/,
        use: [ 'file-loader?name=[path][name].[ext]!extract-loader!html-loader' ]
      },
    ],
  },
};

module.exports = config;
