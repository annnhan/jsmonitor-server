var path = require('path');
var webpack = require('webpack');
var utils = require('./webpack-utils');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    monitor: path.resolve(__dirname, './common/js/sdk.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/static/dist',
    filename: '[name].js',
    chunkFilename: '[id].js',
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'static': __dirname,
      'public': path.resolve(__dirname, './public'),
      'common': path.resolve(__dirname, './common'),
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 20000,
          name: path.posix.join(__dirname, 'dist/img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 20000,
          name: path.posix.join(__dirname, 'dist/fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [require('postcss-cssnext')()]
  },
  postcss: () => {
    return [
      require('autoprefixer')
    ];
  },
  plugins: [

    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
    }),

    // new ExtractTextPlugin("[name].css"),
  ]
};
