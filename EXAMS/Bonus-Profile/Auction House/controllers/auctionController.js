const { deleteAuction } = require('../services/auctionService');
const { getOne, updateAuction } = require('../services/auctionService');
const { parseError } = require('../utils/parser');
const auctionController = require('express').Router();

auctionController.get('/edit/:id', async (req, res) => {
    const auction = await getOne(req.params.id);
    res.render('edit', {
        title: 'Auction Edit',
        user: req.user,
        auction
    })
})

auctionController.post('/edit/:id', async (req, res) => {
    const title = req.body.title;
    const category = req.body.category;
    const imageUrl = req.body.imageUrl;
    const price = Number(req.body.price);
    const description = req.body.description;

    try {
        await updateAuction(req.params.id, {title, category, imageUrl, price, description});
        res.redirect(`/details/${req.params.id}`);
    } catch (err) {
        res.render('edit', {
            title: 'Edit Auction',
            user: req.user,
            errors: parseError(err),
            auction:{
                title: req.body.title,
                category: req.body.category,
                imageUrl: req.body.imageUrl,
                price: Number(req.body.price),
                description: req.body.description,
                _id: req.params.id
            }
        })
    }
})


auctionController.get('/delete/:id', async(req, res) => {
    await deleteAuction(req.params.id);
    res.redirect('/browser')
})

module.exports = auctionController;