var express = require('express');
var compression = require('compression');
var helmet = require('helmet');
var renderer = require('./src/renderer');

var app = express();

app.use(helmet());

app.use(compression());

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.send('Welcome to the email letter rendering service')
});

app.post('/render', (req, res) => {
    if (!req.query.template) {
        res.status(400).send('Template name is required');
    }

    var reqData = "";

    req.on('data', data => {
        reqData += data;
    });

    req.on('end', () => {
        try {
            renderer.renderLetter(req.query.template, reqData ? JSON.parse(reqData) : {}).then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send(err);
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });
});

app.use((err, req, res, next) => {
    console.error('Something went wrong', err)
    res.status(500).send('Something went wrong');
});

app.listen(3000);