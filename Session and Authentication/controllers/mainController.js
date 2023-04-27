const mainController = require("express").Router();


mainController.get('/', (req, res) => {
    res.render('home');
})

module.exports = mainController
