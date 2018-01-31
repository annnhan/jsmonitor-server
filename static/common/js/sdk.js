/**
 * Created by hanan on 17/11/14.
 */
var win = window;
var Monitor = require('./monitor');
var monitor = new Monitor();
var oldOnErrorHandler = win.onerror;
var oldOnBeforeUnloadHandler = win.onbeforeunload;
var queue = [];
var pushCount = {}
var pushTimer = null;

win.monitor = monitor;

monitor.vuePlugin = {
  install: function (Vue, options) {
    var errorHandler = Vue.config.errorHandler;
    Vue.config.errorHandler = function (error) {
      error.stack = error.stack;
      error.message = error.message;
      collect(error, error.message + JSON.stringify(error.stack));
      call(errorHandler, arguments, win);
      throw error;
    }
  }
};

win.onerror = function (message, fileName, lineNumber, columnNumber, error) {
  error.message = message;
  error.fileName = fileName.split(' ')[0];
  error.lineNumber = lineNumber;
  error.columnNumber = columnNumber;
  collect(error, '' + error.message + error.fileName + error.lineNumber + error.columnNumber);
  call(oldOnErrorHandler, arguments, win);
};

win.onbeforeunload = function () {
  push();
  call(oldOnBeforeUnloadHandler, arguments, win);
}

go();

//============== function ===================//

// 采集
function collect(error, key) {
  pushCount[key] = pushCount[key] || 0;
  if (pushCount[key] < monitor._config.repeat) {
    pushCount[key]++;
    queue.push(error);
  }
}

// 推送
function push() {
  for (var i = 0; i < queue.length; i++) {
    monitor.push(queue[i]);
  }
  queue = [];
}

// 定时推送
function go() {
  pushTimer = setTimeout(function () {
    push();
    go();
  }, monitor._config.interval);
}

// 调用一个函数
function call(fun, args, context) {
  if (typeof fun === 'function') {
    fun.apply(context, args);
  }
}