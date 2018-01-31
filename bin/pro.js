/**
 * Created by hanan on 16/11/28.
 */

require('shelljs/global');
var path = require('path');
var fs = require('fs');
var ora = require('ora');
var webpack = require('webpack');
var config = require('../config/pro');
var app = require('../app');
var server = app.server;
var webpackConfig = require('../static/webpack.pro.conf');
var staticPath = path.resolve(__dirname, '../static');
var distPath = path.resolve(staticPath, 'dist');
var compileTimer;

// 创建静态文件构建产出的 dist 目录
if (!fs.existsSync(distPath)) {
  mkdir(distPath);
}

// 清空 dist
rm('-rf', distPath + '/*');

// 构建静态文件
var compiler = webpack(webpackConfig);
compile();

// 运行 server
app.run(config);

//============= function =============//

function compile() {
  compiler.run(function (err, stats) {
    if (err) throw err;
    stats.compilation.entries.forEach(function (entry) {
      entry.chunks.forEach(function (chunk) {
        server.app.sourceVersion[chunk.name] = chunk.renderedHash;
      });
    });
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n');
  })
}