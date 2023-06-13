const { Schema, model, Types} = require('mongoose');

const auctionShema = new Schema({
    title: { type: String, minlength: [4, 'title shoud be at least 4 charecters long']}, 
    description: { type: String, maxlength: [200, 'descripton must be at most 200 charecters long']},
    category: { type: String, required: [true, 'Category is required']},
    imageUrl: { type: String },  
    price: { type: Number, required: [true, 'Price is required'], min: [0.1, 'price must be a positive number']},
    author: { type: Types.ObjectId, ref: 'User', required: true }, 
    bidder: { type: [Types.ObjectId], ref: 'User', default: [], required: true }
});

const Auction = model('Auction', auctionShema);

module.exports = Auction;