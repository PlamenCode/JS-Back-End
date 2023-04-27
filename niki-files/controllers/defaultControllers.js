const defaultControler = require('express').Router();

defaultControler.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})

module.exports = defaultControler;