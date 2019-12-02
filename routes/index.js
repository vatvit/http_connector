const config = require('config');
const fs = require('fs');
const ejs = require('ejs');
const router = require('express').Router();

const wsTest = fs.readFileSync(__dirname + '/wsTest.ejs', 'utf8');

router.get('/wsTest', function routeWsTest (req, res) {
  res.send(ejs.render(wsTest, {
    ws: config.get('ws'),
    website: config.get('website'),
  }));
});

router.use('/commands', require('./commands'));

module.exports = router;