/**
 * Created by hanan on 17/11/14.
 */

module.exports = {
  method: 'get',
  path: '/api/proxy',
  config: {
    cors: true,
  },
  handler: function (request, reply) {
    return reply.proxy({uri: request.query.u});
  }
}