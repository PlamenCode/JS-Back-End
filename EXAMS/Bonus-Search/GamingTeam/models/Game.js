const { Schema, model, Types} = require('mongoose');


const gameShema = new Schema({
    name: { type: String, required: true},
    imageUrl: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true},
    genre: { type: String, required: true},
    platform: { type: String, required: true},
    bougthBy: { type: [Types.ObjectId], ref: 'User', default: [], required: true},
    owner: {type: Types.ObjectId, ref: 'User', required: true}
});

const Game = model('Game', gameShema);

module.exports = Game