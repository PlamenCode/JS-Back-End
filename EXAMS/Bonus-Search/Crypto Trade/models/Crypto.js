const { Schema, model, Types} = require('mongoose');

const URL_PATTERN = /https?:\/\/./i

const cryptoShema = new Schema({
    name: {type: String, required: true, unique: true, minlength: [2, 'Name must be at least 2 charecters long.']},
    imageUrl: { type: String, validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Invalid image Url'
    }},
    price: {type: Number, required: true, min: [0.0000001, 'Price must be a positive number']},
    desc: {type: String, required: true},
    payment: {type: String, required: true},
    bougthBy: {type: [Types.ObjectId], ref: 'User', default: [], required: true},
    owner: {type: Types.ObjectId, ref: 'User', required: true},
});

cryptoShema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

// Payment Method: String (crypto-wallet, credit-card, debit-card, paypal) required,

const Crypto = model('Crypto',cryptoShema);

module.exports = Crypto;