const di = require('bottlejs').pop('app').container;

const logger = di.Logger;
const commandsQueue = di.CommandsQueue;

module.exports = function wsEvents (socket) {

    socket.on('disconnect', function() {
      logger.log('WS disconnected');
    });

    socket.on('message', function wsMessageHandler (data) {
      logger.log('WS message');
      logger.log(data);

      commandsQueue.push(data);
      const queue = commandsQueue.get();

      socket.emit('message', data);
      socket.emit('inQueue', queue);
      socket.broadcast.emit('message', data);
      socket.broadcast.emit('inQueue', queue);
    });

    socket.on('getQueue', function wsGetQueueHandler () {
      logger.log('WS getQueue');

      const queue = commandsQueue.get();

      socket.emit('queue', queue);

      commandsQueue.clear();

      socket.emit('inQueue', queue);
      socket.broadcast.emit('inQueue', queue);
    });

};