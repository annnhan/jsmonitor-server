/**
 * Created by hanan on 17/11/14.
 */

const logger = require('../../model/logger');
module.exports = {
  method: 'post',
  path: '/api/push',
  config: {
    cors: true,
  },
  handler: function (request, reply) {
    let errorInfo = request.payload;
    errorInfo.userAgent = request.headers['user-agent'];
    errorInfo.ip = request.headers['x-real-ip'] || request.info.remoteAddress;
    logger
      .push(errorInfo)
      .then((result)=> {
        reply({
          code: '00000',
          message: 'ok',
        })
      })
      .catch((error)=>{
        reply({
          code: '00001',
          message: error.message || 'push error',
          value: error
        })
      });
  }
}