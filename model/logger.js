/**
 * Created by hanan on 17/2/20.
 */
const fs = require('fs');
const path = require('path');
const graylog = require('graylog-api');
const querystring = require('querystring');
const moment = require('moment');
const projects = require('./projects');
const server = global.server;
const envs = process.env;
const env = envs.env || 'development';
const graylogKeys = [
  'beat_hostname',
  'beat_name',
  'beat_version',
  'env',
  'facility',
  'gl2_remote_ip',
  'gl2_remote_port',
  'gl2_source_input',
  'gl2_source_node',
  'input_type',
  'kafka_consumer_group',
  'kafka_msg_size',
  'kafka_offset',
  'kafka_partition',
  'kafka_topic',
  'level',
  'offset',
  'source',
  'source_file',
  'streams',
  'tags',
  'type',
];

let fullLogFileName = '';
if (env === 'production' && envs.LOG_PATH && envs.LOG_FILE_NAME) {
  fullLogFileName = path.join(envs.LOG_PATH, envs.LOG_FILE_NAME);
  if (!fs.existsSync(fullLogFileName)) {
    fs.writeFileSync(fullLogFileName, '');
  }
}

const graylogServer = {
  basicAuth: 'user:pass',
  protocol: 'http',
  host: 'graylogServer.com',
  port: '80',
  path: '/api'
};

var graylogAPI = graylog.connect(graylogServer);

class Loger {
  constructor(option) {
  }

  static create() {
    return new Loger();
  }

  /**
   * 获取异常日志列表
   * @param options.query 查询语句
   * @param options.startTime 起始时间
   * @param options.endTime 结束时间
   * @param options.pageSize 每页条数
   * @param options.pageNumber 页码
   * @returns {*}
   */
  getList(options) {
    options = Object.assign({
      startTime: moment().subtract(7, 'days').toJSON(),
      endTime: moment().toJSON(),
      pageSize: 200,
      pageNumber: 1,
    }, options || {});
    return new Promise((resolve, reject) => {
      const searchOption = {
        query: `${options.query} AND serviceName:jsmonitor-server`,
        from: options.startTime,
        to: options.endTime,
        limit: options.pageSize,
        offset: options.pageSize * (options.pageNumber - 1) + 1,
        sort: 'asc',
        filter: 'streams:youstreams'
      };
      graylogAPI.searchAbsolute(searchOption, (err, data) => {
        err ? reject(err) : resolve({
          pageNumber: options.pageNumber,
          pageSize: options.pageSize,
          list: data.messages.map(item => {
            let logInfo = item.message;
            graylogKeys.forEach(key => delete logInfo[key]);
            if (logInfo.stack) {
              logInfo.stack = `[${logInfo.stack}]`;
              logInfo.stack = logInfo.stack.replace(/=>/g, ':');
              logInfo.stack = JSON.parse(logInfo.stack);
            }
            return logInfo
          })
        });
      });
    });
  }

  getDetail(id) {
    return new Promise((resolve, reject) => {
      this.getList({_id: id, startTime: moment().subtract(30, 'days').toJSON()})
        .then(messages => messages.length ? messages[0] : reject(new Error('not found')))
        .catch(err => reject(err))
    });
  }

  push(error) {
    return new Promise((resolve, reject) => {

      if (!projects[error.projectName]) {
        reject(new Error(`Can not find project: ${error.projectName}`));
        return;
      }

      const logInfo = Object.assign(error, {
        serviceName: envs.serviceName || 'jsmonitor-server',
        thread: envs.thread,
        env: env,
        group: envs.group,
      });
      for (var key in logInfo) {
        if (!logInfo[key]) {
          delete logInfo[key];
        }
      }
      let logInfoString = JSON.stringify(logInfo);
      console.log(logInfoString);
      if (fullLogFileName) {
        fs.appendFile(fullLogFileName, logInfoString + '\n', (err) => {
          err ? reject(err) : resolve(logInfo);
          ;
        });
      }
      else {
        resolve(logInfo);
      }
    });
  }
}

module.exports = Loger.create();
