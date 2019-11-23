var fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, 'wsTest.html');

module.exports = function wsTestRoute (req, res) {
  fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      throw new Error('Template "wsTest" read error: ' + err);
    }
    res.send(data);
  });
};