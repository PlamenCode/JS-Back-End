const { getCryptoById, updateCrypto, deleteCrypto } = require('../services/cryptoService');
const { parseError } = require('../utils/parser');

const coinController = require('express').Router();

coinController.get('/edit/:id', async (req, res) => {
    const cryptoData = await getCryptoById(req.params.id);
    res.render('edit', {
        title: `${cryptoData.name} Edit Page`,
        user: req.user,
        cryptoData
    })
})

coinController.post('/edit/:id', async (req, res) => {
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

        await updateCrypto(req.params.id, cryptoData);
        res.redirect(`/details/${req.params.id}`);

    } catch(err) {
        res.render('edit', {
            title: 'Edit Page',
            user: req.user,
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

coinController.get('/delete/:id', async(req, res) => {
    await deleteCrypto(req.params.id);
    res.redirect('/catalog')
})

coinController.get('/buy/:id', async(req, res) => {
    
})


module.exports = coinController;