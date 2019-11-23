const urljoin = require('url-join');
const express = require('express');

const app = express();

app.ws = require('./wsEvents');

app.use('/status', function routeStatus (req, res) {
    res.send({status: 'ok'});
});

app.use(urljoin('/', 'api', 'v1'), require('./routes'));

app.use((req, res) => {
    return res.status(404).send({
        status: 404,
    });
});

app.use((err, req, res, next) => {
    return res.status(500).send({
        status: 500,
        error: err,
    });
});

module.exports = app;
