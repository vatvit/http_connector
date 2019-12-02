const defer = require('config/defer').deferConfig;
const urljoin = require('url-join');

module.exports = {
  website: {
    baseHost: process.env.APP_HOST,
    basePath: '/http_connector',
  },
  ws: {
    host: defer((cfg) => cfg.website.baseHost),
    path: defer((cfg) => urljoin(cfg.website.basePath, 'ws')),
  },
};