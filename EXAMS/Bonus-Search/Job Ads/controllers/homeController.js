// TODO replase with contoller from task.

const { getFirstAdds } = require('../services/adService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const adds = await getFirstAdds();
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        adds
    });
});


module.exports = homeController;
