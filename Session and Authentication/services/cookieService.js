const cookieService = require('express').Router();


cookieService.get('/cookie', (req, res) => {
    res.cookie('message', 'Hello');
    res.end('Cookie Set');
});

cookieService.get('/readCookie', (req, res) => {
    res.json(req.cookies);
});

module.exports = cookieService