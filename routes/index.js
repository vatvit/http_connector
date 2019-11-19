const router = require('express').Router();

router.use('/test', function routeTest(req, res) {
  res.send('test');
});

