const router = require('express').Router();

router.get('/test', function routeTest(req, res) {
  res.send('test');
});

router.get('/wsTest', require('./wsTest'));

module.exports = router;