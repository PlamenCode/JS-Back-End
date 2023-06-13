const { getOne, bidding } = require('../services/auctionService');
const { getCurrentbidderName } = require('../services/userService');

const detailsController = require('express').Router();

detailsController.get('/:id', async (req, res) => {
    const auction = await getOne(req.params.id);
    let names = await getCurrentbidderName(auction.bidder.toString());
    
    let renderComponent = 'details-owner';

    if(auction.author.toString() !== req.user._id.toString()){
        renderComponent = 'details';
    }
    
    let isHighestBidder = false;
    if(auction.bidder[0].toString() == req.user._id.toString()){
        isHighestBidder = true;
    }
    res.render(`${renderComponent}`,{
        title: `${auction.title} Details`,
        user: req.user,
        auction,
        names,
        isHighestBidder
    });
});


detailsController.post('/bid/:id', async (req, res) => {
    const number = Number(req.body.bidAmount);
    const auction = await getOne(req.params.id);
    try {
        if(number > auction.price){
            const result = await bidding(req.params.id, req.user._id, number)
            console.log(result);
            res.redirect(`/details/${req.params.id}`)
        } else{
            throw new Error('Bid must be higher')
        }
    } catch (err) {
       res.redirect(`/details/${req.params.id}`)
    }
})

module.exports = detailsController;