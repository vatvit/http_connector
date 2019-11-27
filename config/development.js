const defer = require('config/defer').deferConfig;
const urljoin = require('url-join');

module.exports = {
  basePath: '/',
  baseHost: 'http://127.0.0.1',
  ws: {
    host: defer((cfg) => cfg.baseHost),
    path: defer((cfg) => urljoin(cfg.basePath, 'ws')),
  },
};