/**
 * Created by hanan on 17/11/14.
 */
const fs = require('fs');
const server = global.server;
const logger = require('../../model/logger');
module.exports = {
  method: 'get',
  path: '/api/log/{id}',
  config: {},
  handler: function (request, reply) {
    logger
      .getDetail(request.params.id)
      .then((result)=> {
        reply(result)
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