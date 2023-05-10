const { getAllWishedBooks } = require('../services/userBooksService');
const { getUserData } = require('../services/userService');

const profileController = require('express').Router();

profileController.get('/:id', async (req, res) => {
    const user = await getUserData(req.params.id);

    const books = await getAllWishedBooks(req.user._id);
    res.render('profile', {
        title: 'Profile',
        user,
        books,
    })
})

module.exports = profileController;