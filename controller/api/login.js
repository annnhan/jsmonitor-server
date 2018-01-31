/**
 * Created by hanan on 17/11/14.
 */
const crypto = require('crypto');
const jwt    = require('jsonwebtoken');
const users  = require('../../model/users');
const server = global.server;

module.exports = {
  method: 'post',
  path: '/api/login',
  config: {},
  handler: function (request, reply) {
    const requestMail = request.payload.mail;
    const requestPassword = request.payload.password;

    if (!users[requestMail]) {
      reply({
        code: '00001',
        message: '用户不存在',
      });
    }
    else {
      const hash = crypto.createHash('sha1');
      hash.update(requestPassword);
      const requestPasswordHash = hash.digest('hex');
      if (users[requestMail].password == requestPasswordHash) {
        const userInfo = Object.assign({}, users[requestMail]);
        delete userInfo.password;
        reply({
          token:jwt.sign(userInfo, server.app.config.secretKey),
          userInfo,
        });
      }
      else {
        reply({
          code: '00001',
          message: '密码错误',
        });
      }
    }
  }
}