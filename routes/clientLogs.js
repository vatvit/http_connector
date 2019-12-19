const Joi = require('@hapi/joi');

const di = require('bottlejs').pop('app').container;
const router = require('express').Router();

const clientLogs = di.ClientLogs;
const wsSocketsManager = di.WsSocketsManager;

router.get('/', function routeGet (req, res) {
  const logs = clientLogs.all();

  res.send(logs);
});

router.post('/', function routePost (req, res) {
  const message = Joi.attempt(req.body, Joi.object({
    message: Joi.string().required(),
  }));

  clientLogs.add(message);

  wsSocketsManager.broadcast('clientLogs', clientLogs.all());

  res.send();
});

module.exports = router;