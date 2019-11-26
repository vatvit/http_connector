const urljoin = require('url-join');
const defer = require('config/defer').deferConfig;

module.exports = {
  basePath: '/',
  baseHost: 'http://127.0.0.1',
  ws: {
    uri: defer((cfg) => urljoin(cfg.baseHost, cfg.basePath)),
  },
};