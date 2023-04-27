const express = require('express');
const hbs = require('express-handlebars').create({ extname: ".hbs" });
const cookieParser = require('cookie-parser');
const defaultTitle = require('../middlewares/defaultTitle');
const auth = require('../middlewares/auth');
const userNav = require('../middlewares/userNav');

const jwtSecret = 'Secret initiate';

module.exports = (app) => {
    
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(defaultTitle('Default Title'));
    app.use(cookieParser());  //cookie parser before auth middleware because it has to parse the token
    app.use(auth(jwtSecret));
    app.use(userNav());  // has to be after auth because auth puts the user in the req and it needs it

}
