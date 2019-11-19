
console.log('http connector index start');

const server = require('../server');
const app = require('./app');

server.start(app);

console.log('http connector index end');
