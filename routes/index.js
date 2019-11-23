const router = require('express').Router();

router.get('/test', function routeTest(req, res) {
  res.send('test');
});

module.exports = router;