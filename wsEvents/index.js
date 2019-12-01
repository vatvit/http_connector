const Joi = require('@hapi/joi');

const di = require('bottlejs').pop('app').container;

const logger = di.Logger;
const wsSocketsManager = di.WsSocketsManager;
const commandsQueue = di.CommandsQueue;

module.exports = function wsEvents (socket) {

  wsSocketsManager.add(socket);

    socket.on('disconnect', function() {
      logger.log('WS disconnected');
      wsSocketsManager.remove(socket.id);
      logger.log('WS connections: ' + wsSocketsManager.count());
    });

    socket.on('message', function wsMessageHandler (input) {
      logger.log('WS message');
      logger.log(input);

      socket.emit('message', input);
      socket.broadcast.emit('message', input);

      const data = Joi.attempt(input, Joi.object({
        commands: Joi.array().min(1).items(Joi.string().required()),
      }));

      for (let commandString of data.commands) {
        commandsQueue.add(commandString);
      }

      const queue = commandsQueue.all();

      socket.emit('inQueue', queue);
      socket.broadcast.emit('inQueue', queue);
    });

    socket.on('getQueue', function wsGetQueueHandler () {
      logger.log('WS getQueue');

      socket.emit('inQueue', commandsQueue.all());
    });

    socket.on('clearQueue', function wsClearQueueHandler () {
      logger.log('WS clearQueue');

      const queue = commandsQueue.clear();

      socket.emit('inQueue', queue);
      socket.broadcast.emit('inQueue', queue);
    });

};