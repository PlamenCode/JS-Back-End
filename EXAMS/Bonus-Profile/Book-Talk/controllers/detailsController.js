const { getBookById } = require('../services/bookService');

const detailsController = require('express').Router();

detailsController.get('/details/:id', async (req, res) => {
    const book = await getBookById(req.params.id);
    let isOwner = false;
    let hasAdded = false;

    if(book.owner == req.user._id){
        isOwner = true;
    };
    if(book.wishList.some(id => id.toString() == req.user._id.toString())){
        hasAdded = true;
    }
    res.render('details', {
        title: 'Book Details',
        user: req.user,
        book,
        isOwner,
        hasAdded
    });
});




module.exports = detailsController;