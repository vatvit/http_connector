const bottlejs = require('bottlejs').pop('app');

bottlejs.service('Logger', function Logger () {
  return {
    log: function (message) {
      console.log(message);
    }
  };
});

bottlejs.service('CommandsQueue', function commandsQueueConstructor () {
  return new (require('./commands').CommandsQueue)();
});

bottlejs.service('WsSocketsManager', function wsSocketsEventsEmitterConstructor () {
  return new (require('./wsSocketsManager'))();
});

bottlejs.service('ClientLogs', function wsSocketsEventsEmitterConstructor () {
  return new (require('./clientLogs'))();
});