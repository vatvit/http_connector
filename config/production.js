const defer = require('config/defer').deferConfig;
const urljoin = require('url-join');

module.exports = {
  basePath: '/http_connector',
  baseHost: process.env.APP_HOST,
  ws: {
    host: defer((cfg) => cfg.baseHost),
    path: defer((cfg) => urljoin(cfg.basePath, 'ws')),
  },
};