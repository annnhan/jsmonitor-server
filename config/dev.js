/**
 * Created by an.han on 16/11/27.
 */
const baseConfig = require('./base');

module.exports = Object.assign(baseConfig, {
  type: 'dev',

  // 日志
  log: {
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{log: '*', request: '*', response: '*'}]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
});