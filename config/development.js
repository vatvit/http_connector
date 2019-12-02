const defer = require('config/defer').deferConfig;
const urljoin = require('url-join');

module.exports = {
  website: {
    baseHost: 'http://127.0.0.1',
    basePath: '/',
  },
  ws: {
    host: defer((cfg) => cfg.website.baseHost),
    path: defer((cfg) => urljoin(cfg.website.basePath, 'ws')),
  },
};