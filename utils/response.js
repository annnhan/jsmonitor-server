/**
 * Created by hanan on 17/11/17.
 */

class Response {
  constructor (code = '99999', message = '请求异常', value = '') {
    if (arguments.length == 1) {
      value = code;
      code = '00000';
      message = 'ok';
    }
    this.code = code;
    this.message = message;
    this.value = value;
  }
}


module.exports = Response;
