const { getAllAdds } = require('../services/adService');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    const adds = await getAllAdds();
    res.render('catalog', {
        title: 'CatalogPage',
        user: req.user,
        adds
    })
})


module.exports = catalogController