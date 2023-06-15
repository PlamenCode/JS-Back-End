const { getAllAdds } = require('../services/adService');

const searchController = require('express').Router();

searchController.get('/', (req, res) => {
    res.render('search', {
        title: 'Search',
        user: req.user
    });
});

searchController.post('/', async (req, res) => {
    const searchQuery = req.body.search;

    const adds = await getAllAdds();
    console.log(adds);
    res.render('search', {
        title: 'Search',
        user: req.user
    });
})

module.exports = searchController