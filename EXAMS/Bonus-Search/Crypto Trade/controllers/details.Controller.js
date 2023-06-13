const { getCryptoById } = require('../services/cryptoService');

const detailsController = require('express').Router();


detailsController.get('/:id', async (req, res) => {
    try {
        const coin = await getCryptoById(req.params.id);

        let isOwner = false;
        if( req.user && (coin.owner.toString() == req.user._id.toString())){
            isOwner = true;
        }

        let hasBought = false;
        if(req.user && (coin.bougthBy.includes(req.user._id))){
            hasBought = true;
        }

        res.render('details',{
            title: `${coin.name} details`,
            user: req.user,
            coin,
            isOwner,
            hasBought
        })
        
    } catch (err) {
        res.render('404', {
            title: '404 Coin Found',
            user: req.user,
        })
    }
})

module.exports = detailsController;