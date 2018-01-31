/**
 * Created by an.han on 16/11/27.
 * 静态资源
 */

const path = require('path');
module.exports = {
  method: 'GET',
  path: '/static/{file*}',

  handler: {
    directory: {
      path: path.resolve(__dirname, '../../static'),
    }
  },
  config: {
    cors: true,
    // cache: {
    //   privacy: 'public',
    //   expiresIn: 2651765973239,
    // }
  }
}