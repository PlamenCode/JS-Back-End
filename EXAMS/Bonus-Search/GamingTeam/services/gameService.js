const Game = require("../models/Game");


async function getAllGames(){
    return await Game.find({}).lean();
};

async function createGame(gameData){
    return await Game.create(gameData);
};

async function getGameById(id){
    return await Game.findById(id).lean();
};

async function updateGame(id, gameData){
    const game = await Game.findById(id);

    game.name = gameData.name;
    game.imageUrl = gameData.imageUrl;
    game.price = gameData.price;
    game.description = gameData.description;
    game.genre = gameData.genre;
    game.platform = gameData.platform;

    game.save();
};

async function deleteGame(id){
    return await Game.findByIdAndDelete(id);
};

async function buyGame(userId, gameId){
    const game = await Game.findById(gameId);
    if(game.bougthBy.some(x => x.toString() == userId.toString())){
        return;
    };
    game.bougthBy.push(userId);
    return game.save();
}



module.exports = {
    getAllGames,
    createGame,
    getGameById,
    updateGame,
    deleteGame,
    buyGame
}

