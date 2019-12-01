const urljoin = require('url-join');
const express = require('express');
const config = require('config');

const di = require('./di');

const app = express();

app.wsEvents = require('./wsEvents');

app.init = function init () {

    app.use(express.json());

    app.use(function routeDebug (req, res, next) {
        console.dir('originalUrl: ' + req.originalUrl);
        console.dir('baseUrl: ' + req.baseUrl);
        console.dir('path: ' + req.path);
        next();
    });

    app.use(urljoin(config.get('basePath'), '/status'), function routeStatus (req, res) {
        res.send({status: 'ok'});
    });

    app.use(urljoin(config.get('basePath'), 'api', 'v1'), require('./routes'));

    app.use((req, res) => {
        return res.status(404).send({
            status: 404,
            originalUrl: req.originalUrl,
        });
    });

    app.use((err, req, res, next) => {
        return res.status(500).send({
            status: 500,
            error: err,
        });
    });

};

module.exports = app;
