/**
 * Created by an.han on 16/11/27.
 */
'use strict';

const Hapi = require('hapi');
const client = require('./utils/client');
const route = require('./utils/route');
const server = global.server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: __dirname
      },
      state: {
        parse: true, // parse and store in request.state
        failAction: 'ignore' // may also be 'ignore' or 'log'
      }
    }
  }
});

const errorCallback = (err) => {
  if (err) {
    server.error(err);
  }
}

// 项目目录
server.app.dirname = __dirname;

// 静态资源版本号
server.app.sourceVersion = {};

module.exports.server = server;
module.exports.run = function (config) {

  var port = process.env.PORT0 || config.port || 3000;

  server.connection({port: port});

  // 配置信息
  server.app.config = config;

  // 静态资源请求支持
  server.register(require('inert'), errorCallback);

  // 添加请求代理功能
  server.register(require('h2o2'), errorCallback);

  // server 日志配置
  server.register({register: require('good'), options: config.log}, errorCallback);

  // 配置页面模板
  server.register(require('vision'), (err) => {
    if (err) {
      return server.error(err);
    }
    server.views({
      engines: {
        hbs: require('handlebars')
      },
      relativeTo: __dirname,
      path: './view',
      layoutPath: './view/layout',
      helpersPath: './view/helper'
    });
  });

  // jwt
  server.register(require('hapi-auth-jwt2'), function (err) {

    if (err) {
      return server.error(err);
    }

    server.auth.strategy('jwt', 'jwt', {
        key: config.secretKey,
        validateFunc: require('./utils/jwt-validate'),
        verifyOptions: {algorithms: ['HS256']}
      });
    // server.auth.default('jwt');
  });

  // 获取客户端平台挂在 request.client 属性，用于区分渲染模板。
  server.ext('onRequest', (request, reply) => {
    request.client = client(request);
    return reply.continue();
  });

  server.ext('onPreResponse', (request, reply) => {
    let response = request.response;
    if (response.headers) {
      response.headers['Access-Control-Allow-Origin'] = '*';
    }
    if (request.route.path == '/static/{file*}' || request.route.path == '/api/proxy') {
      return reply.continue();
    }
    response.source = response.source && response.source.code && response.source.message ?
      response.source : {
        code: '00000',
        message: 'ok',
        value: response.source
      }
    response.source.request = {
      headers: request.headers,
      info: request.info,
      // env: process.env
    }
    return reply.continue();
  });

  // 添加路由
  route(server);

  //运行
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: http://localhost:${port}`);
  });
};
