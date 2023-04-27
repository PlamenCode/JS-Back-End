const aboutControler = require('express').Router();

aboutControler.get('/', (req, res) => {
    res.render('about', { title: 'About Page' });
});

module.exports = aboutControler;