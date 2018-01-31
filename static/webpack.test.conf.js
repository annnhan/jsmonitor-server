var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var es3ifyPlugin = require('es3ify-webpack-plugin');

var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',

  plugins: [
    new webpack.DefinePlugin({
      API_ROOT_URL: JSON.stringify('http://fem.finupgroup.com/api')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new es3ifyPlugin()
  ]
})


module.exports = webpackConfig
