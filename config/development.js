const defer = require('config/defer').deferConfig;

module.exports = {
  basePath: '/',
  baseHost: 'http://127.0.0.1',
  ws: {
    host: defer((cfg) => cfg.baseHost),
  },
};