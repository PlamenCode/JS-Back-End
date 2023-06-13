const { hasUser } = require('../middlewares/guards');
const { getAllGames, getGameById } = require('../services/gameService');
const { parseError } = require('../utils/parser');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {

    const games = await getAllGames();
    res.render('catalog', {
        title: 'Catalog Page',
        user: req.user,
        games
    }); 
});


catalogController.get('/details/:id', async (req, res) => {
    const game = await getGameById(req.params.id);
    let isOwner;
    let hasBought;
    if(req.user && (game.bougthBy.some(x => x.toString() == req.user._id.toString()))){
        hasBought = true;
    }
    if(req.user && (game.owner.toString() == req.user._id.toString())){
        isOwner = true;
    };
    try {
        res.render('details', { 
            title: 'Game Detais',
            user: req.user,
            game,
            isOwner,
            hasBought
        }); 
    } catch (err) {
        res.render('details', {
            title: 'Game Detais',
            user: req.user,
            game,
            isOwner,
            hasBought,
            errors: parseError(err)
        });
    }
})


module.exports = catalogController;
