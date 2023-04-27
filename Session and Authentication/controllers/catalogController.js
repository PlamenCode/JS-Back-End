const catalogController = require("express").Router();


catalogController.get('/', (req, res) => {
    console.log(req.headers.cookie);
    res.render('catalog');
});


module.exports = catalogController