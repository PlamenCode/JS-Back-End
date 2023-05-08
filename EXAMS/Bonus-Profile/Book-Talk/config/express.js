const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');

module.exports = (app) => {
    const hbs = handlebars.create({
        extname: '.hbs'
    });

    app.engine('.hbs', hbs.engine); // view engine tied with .hbs extention
    app.set('view engine', '.hbs'); // set so instead of - res.render('example.hbs') we can type - res.render('example');

    app.use('/static', express.static('static')); // To use static files like css and img
    app.use(express.urlencoded({extended: true}));

    app.use(cookieParser());
    app.use(session()); //uses cookies so it has to be after the cookieParser();
    app.use(trimBody());
    
}