var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf');
var path = require('path');
var utils = require('./webpack-utils');
var es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      API_ROOT_URL: JSON.stringify('http://localhost:3000/api')
    }),
    new es3ifyPlugin()
  ]
})
