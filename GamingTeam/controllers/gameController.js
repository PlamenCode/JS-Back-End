const { getGameById, updateGame, deleteGame, buyGame } = require('../services/gameService');
const { parseError } = require('../utils/parser');

const gameController = require('express').Router();

gameController.get('/:id/edit', async (req, res) => {
    const game = await getGameById(req.params.id);
    res.render('edit', {
        title: 'Edit Game',
        game,
        _id: req.params.id
    })
});

gameController.post('/:id/edit', async (req, res) => {
    try {
        if(req.body.name == '' || req.body.imageUrl == '' || req.body.price == '' || req.body.genre == '' || req.body.description == '' || req.body.platform == ''){
            throw new Error('All fields are required');
        };
        const gameData = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price),
            description: req.body.description,
            genre: req.body.genre,
            platform: req.body.platform,
        };

        await updateGame(req.params.id, gameData);
        res.redirect('/catalog');
    } catch(err){
        res.render('edit', {
            title: 'Edit Game',
            game: {
                _id: req.params.id,
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

gameController.get('/:id/delete', async (req, res) => {
    const game = await getGameById(req.params.id);
    if(game.owner.toString() !== req.user._id){
        res.redirect('/auth/login');
    }else{
        await deleteGame(req.params.id);
        res.redirect('/catalog')
    }
});


gameController.get('/:id/buy', async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user._id;

    await buyGame(userId, gameId);
    res.redirect(`/catalog/details/${gameId}`);
})


module.exports = gameController