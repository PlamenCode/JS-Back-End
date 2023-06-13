const catalogController = require('express').Router();
const { getAllCryptos } = require('../services/cryptoService')


catalogController.get('/', async (req, res) => {
    const cryptos = await getAllCryptos();
    res.render('catalog', {
        title: 'Catalog Page',
        user: req.user,
        cryptos
    }); 
})


module.exports = catalogController;