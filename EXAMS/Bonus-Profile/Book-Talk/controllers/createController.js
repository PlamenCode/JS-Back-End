const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/parser');
const { createBook } = require('../services/bookService');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create', {
        title: 'Create Book Review',
        user: req.user,
    })
});

createController.post('/', 
    body('imageUrl').isURL().withMessage('Invalid Url'),
async (req, res) => {
    try {
        const result = validationResult(req);
        if(result.length > 0){
            throw result;
        };
        const bookData = {
            title: req.body.title,
            author: req.body.author,
            imageUrl: req.body.imageUrl,
            review: req.body.review,
            genre: req.body.genre,
            stars: Number(req.body.stars),
            owner: req.user._id
        };

        const book = await createBook(bookData);
        res.redirect('/catalog');

    } catch (err) {
        res.render('create', {
            title: 'Create Book Review',
            user: req.user,
            body: {
                title: req.body.title,
                author: req.body.author,
                imageUrl: req.body.imageUrl,
                review: req.body.review,
                genre: req.body.genre,
                stars: Number(req.body.stars),
            },
            errors: parseError(err)
        })
    }
});


module.exports = createController;