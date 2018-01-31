/**
 * Created by an.han on 16/11/27.
 */
const fs = require('fs');
const path = require('path');
const controllerDir = path.resolve(__dirname, '../controller');

module.exports = function addRoute(server, dir = controllerDir) {
  fs.readdirSync(dir).forEach(function (file) {

    const controller = path.resolve(dir, file);

    if (fs.statSync(controller).isDirectory()) {
      addRoute(server, controller);
    }
    else {
      if (/\.js$/.test(controller)) {
        server.route(require(controller));
      }
    }
  });
}