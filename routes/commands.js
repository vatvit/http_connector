const Joi = require('@hapi/joi');

const di = require('bottlejs').pop('app').container;
const router = require('express').Router();

const wsSocketsManager = di.WsSocketsManager;
const commandsQueue = di.CommandsQueue;

router.get('/', function routeGet (req, res) {
  const params = Joi.object(req.query, {
    processing: Joi.any().optional(),
    status: Joi.any().allow(Object.values(commandsQueue.getAllowedStatuses())),
  });

  const commands = commandsQueue.all(params.status);

  if (params.processing) {
    for (let command of commands) {
      commandsQueue.process(command.uuid);
    }
    wsSocketsManager.broadcast('inQueue', commandsQueue.all());
  }

  res.send(commands);

});

router.post('/', function routePost (req, res) {
  const data = Joi.attempt(req.body, Joi.object({
    commands: Joi.array().min(1).items(Joi.string().required()),
  }));

  const commands = [];
  for (let commandString of data.commands) {
    commands.push(commandsQueue.add(commandString));
  }

  wsSocketsManager.broadcast('inQueue', commandsQueue.all());

  res.send(commands);
});

router.put('/:uuid', function routePut (req, res) {
  const data = Joi.attempt(req.body, Joi.object({
    result: Joi.string().required(),
  }));

  commandsQueue.processed(req.params.uuid, data.result);

  wsSocketsManager.broadcast('inQueue', commandsQueue.all());

  res.send(commandsQueue.get(req.params.uuid));
});

module.exports = router;