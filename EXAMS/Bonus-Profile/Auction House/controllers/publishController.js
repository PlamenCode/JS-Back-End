const { createAuction } = require('../services/auctionService');
const { parseError } = require('../utils/parser');

const publishController = require('express').Router();


publishController.get('/', (req, res) => {
    res.render('create', {
        title: 'Publish Auction',
        user: req.user
    })
});

publishController.post('/', async (req, res) => {
    const title = req.body.title;
    const category = req.body.category;
    const imageUrl = req.body.imageUrl;
    const price = Number(req.body.price);
    const description = req.body.description;
    const author = req.user._id;

    try {
        await createAuction({title, category, imageUrl, price, description, author});
        res.redirect('/browser');
    } catch (err) {
        res.render('create', {
            title: 'Publish Auction',
            user: req.user,
            errors: parseError(err),
            body:{
                title: req.body.title,
                category: req.body.category,
                imageUrl: req.body.imageUrl,
                price: Number(req.body.price),
                description: req.body.description,
            }
        })
    }
})


module.exports = publishController;