const { createCrypto } = require('../services/cryptoService');
const { parseError } = require('../utils/parser');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create', {
        title: 'Create Page',
        user: req.user,
    })
});

createController.post('/', async (req, res) => {
    try {
        if(req.body.name == '' || req.body.imageUrl == '' || req.body.price == '' || req.body.desc == '' || req.body.payment == ''){
            throw new Error('All fields are required')
        }
        if(req.body.payment != 'crypto-wallet' && req.body.payment != 'credit-card' &&
           req.body.payment != 'debit-card' && req.body.payment != 'paypal'){
            throw new Error('Invalid Payment method');
        }
        
        const cryptoData = {
            name: req.body.name,
            imageUrl: req.body.imageUrl, 
            price: Number(req.body.price), 
            desc: req.body.desc, 
            payment: req.body.payment,
            owner: req.user._id
        };

        await createCrypto(cryptoData);
        res.redirect('/catalog');

    } catch(err) {
        res.render('create', {
            title: 'Create Page',
            errors: parseError(err),
            cryptoData: {
                name: req.body.name,
                imageUrl: req.body.imageUrl, 
                price: Number(req.body.price), 
                desc: req.body.desc, 
                payment: req.body.payment,
            }
        })
    }
})

module.exports = createController;