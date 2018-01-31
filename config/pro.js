/**
 * Created by an.han on 16/11/27.
 */

const path = require('path');
const baseConfig = require('./base');

module.exports = Object.assign(baseConfig, {

  type: 'pro',

  // oauth 配置
  oauth: {
  },

  // 日志
  log: {
    reporters: {
      file: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{log: '*', error: '*'}]
        },
        {
          module: 'good-squeeze',
          name: 'SafeJson',
          args: [null, {separator: '\n'}]
        },
        {
          module: 'rotating-file-stream',
          args: [
            'app.log',
            {
              size: '10M',
              path: path.resolve(__dirname, '../log'),
              interval: '1d'
            }
          ]
        }
      ]
    }
  }
});