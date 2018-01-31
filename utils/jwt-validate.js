/**
 * Created by hanan on 18/1/16.
 */

const users = require('../model/users');
module.exports =  (decoded, request, callback) => callback(null, !!users[decoded.mail])