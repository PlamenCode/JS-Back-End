const { getAllCryptos, filteredCoins } = require('../services/cryptoService');

const searchController = require('express').Router();

searchController.get('/', async (req, res) => {
    const cryptos = await getAllCryptos();
    res.render('search', {
        title: 'Search',
        user: req.user,
        cryptos
    });
})

searchController.post('/', async (req, res) => {
    const text = req.body.searchText;
    const payment = req.body.payment;

    try {
        const coins = await filteredCoins(payment, text);
        res.render('search', {
            title: 'Search',
            user: req.user,
            cryptos: coins,
            text,
            payment
        });
    } catch (err) {
        res.render('search', {
            title: 'Search',
            user: req.user,
            text: req.body.searchText,
            payment: req.body.payment
        });
    }

})


module.exports = searchController;