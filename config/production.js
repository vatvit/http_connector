const defer = require('config/defer').deferConfig;
const urljoin = require('url-join');

module.exports = {
  baseHost: process.env.APP_HOST,
  basePath: '/http_connector',
  ws: {
    host: defer((cfg) => cfg.baseHost),
    path: defer((cfg) => urljoin(cfg.basePath, 'ws')),
  },
};