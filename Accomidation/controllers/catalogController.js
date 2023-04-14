const { getAll } = require('../services/service');

const router = require('express').Router();

router.get('/', (req, res) => {
    const rooms = getAll();

    res.render('catalog', {
        title: 'Catalog Page',
        rooms
    });
});

router.get('/:id', (req, res) => {
    res.render('details', {
        title: 'Item Details'
    });
});

module.exports = router;
