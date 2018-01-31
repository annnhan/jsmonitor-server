/**
 * Created by an.han on 16/11/27.
 */


const server = global.server;

module.exports = {
  method: 'GET',
  path: '/health',
  handler: function (request, reply) {
    reply('ok');
  }
}