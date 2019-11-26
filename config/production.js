const defer = require('config/defer').deferConfig;

module.exports = {
  basePath: '/http_connector',
  baseHost: process.env.APP_HOST,
  ws: {
    host: defer((cfg) => cfg.baseHost),
    path: defer((cfg) => cfg.basePath),
  },
};