const { getAll } = require('../services/tripService');

const catalogController = require('express').Router();


catalogController.get('/', async(req, res) => {
    const trips = await getAll();
    res.render('shared-trips', {
        title:'Shared-trips',
        user: req.user,
        trips
    })
})

module.exports = catalogController;