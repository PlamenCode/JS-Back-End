const { createGame } = require('../services/gameService');
const { parseError } = require('../utils/parser');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create', {
        title: 'Create Game'
    })
});

createController.post('/', async (req, res) => {
    try {
        if(req.body.name == '' || req.body.imageUrl == '' || req.body.price == '' || req.body.genre == '' || req.body.description == '' || req.body.platform == ''){
            throw new Error('All fields are reqyired');
        };
        const gameData = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price),
            description: req.body.description,
            genre: req.body.genre,
            platform: req.body.platform,
            owner: req.user._id,
        };

        await createGame(gameData);
        res.redirect('/catalog');
        
    } catch (err) {
        res.render('create', {
            title: 'Create Game',
            body: {
                name: req.body.name,
                imageUrl: req.body.imageUrl,
                price: Number(req.body.price),
                description: req.body.description,
                genre: req.body.genre,
                platform: req.body.platform,
            },
            errors: parseError(err)
        })
    }
});


module.exports = createController;