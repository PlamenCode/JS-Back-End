const registerController = require("express").Router();


registerController.get('/', (req, res) => {
    res.render('register');
});


module.exports = registerController