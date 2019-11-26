const urljoin = require('url-join');
const defer = require('config/defer').deferConfig;

module.exports = {
  basePath: '/http_connector',
  baseHost: process.env.APP_HOST,
  ws: {
    uri: defer((cfg) => urljoin(cfg.baseHost, cfg.basePath)),
  },
};