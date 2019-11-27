const di = require('bottlejs').pop('app').container;
const router = require('express').Router();

const wsSocketsManager = di.WsSocketsManager;
const commandsQueue = di.CommandsQueue;

router.get('/', function routeGet (req, res) {
  res.send(commandsQueue.get());
});

router.get('/getAndClear', function routeGetAndClear (req, res) {
  const queue = commandsQueue.get();
  commandsQueue.clear();
  wsSocketsManager.broadcast('inQueue', []);
  res.send(queue);
});

module.exports = router;