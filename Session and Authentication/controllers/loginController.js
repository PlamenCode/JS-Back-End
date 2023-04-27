const loginController = require("express").Router();


loginController.get('/', (req, res) => {
    res.render('login');
});


module.exports = loginController
