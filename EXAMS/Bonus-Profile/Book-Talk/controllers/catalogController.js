const { getAllBooks } = require('../services/bookService');
const { parseError } = require('../utils/parser');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    try {
        const books = await getAllBooks();
        res.render('catalog', {
            title: 'Catalog',
            user: req.user,
            books
        })
    } catch (err) {
        res.render('catalog', {
            title: 'Catalog',
            user: req.user,
            errors: parseError(err)
        })
    }
});

module.exports = catalogController;