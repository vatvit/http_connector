const http = require('http');
const socketIo = require('socket.io');
const config = require('config');

require('http-shutdown').extend();

const server = http.createServer().withShutdown();

const exitHandler = function exitHandler(message) {
    return function handle () {
        console.log(typeof message === 'function' ? message(...arguments) : message);
        server.shutdown(function exit () {console.log('Shutdown');});
    };
};

process.on('SIGINT', exitHandler('SIGINT signal'));
process.on('SIGTERM', exitHandler('SIGTERM signal'));
process.on('exit', exitHandler(function exit(code) {return 'Exit code: ' + code;}));

const start = function start(app) {
    const port = process.env.NODE_PORT || 8888;

    console.log('server start');

    server.on('request', app);
    server.on('error', function onError(error) {
        console.error('Error!');
        console.error(error);
        process.exit(1);
    });
    server.on('listening', function onListening () {
        console.log('listening ' + port);
    });

    if (app.wsEvents) {
        console.log('ws server start');

        const options = {};
        if (config.get('ws').path) {
            options.path = config.get('ws').path;
        }

        const ws = socketIo(server, options);

        ws.on('connection', function (socket) {
            console.log('WS connected');

            app.wsEvents(socket);
        });
    }

    server.listen(port);

    app.init();
};

module.exports.server = server;
module.exports.start = start;
