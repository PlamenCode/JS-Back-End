const { Schema, model, Types} = require('mongoose');


const URL_PATTERN = /^https?:\/\/.+$/i

const hotelShema = new Schema({
    name: { type: String, required: true, unique: true, minlenght: [4, 'The name must be at least 4 charecters long'] },
    city: { type: String, required: true, minlenght: [3, 'The city must be at least 3 charecters long']},
    imageUrl: { type: String, required: true, validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Img Url is not valid' 
    }},
    rooms: { type: Number, required: true, min: [1, 'min rooms 1'], max: [100, 'max rooms 100'] },
    owner: { type: Types.ObjectId, ref: 'User', required: true},
    bookings: { type: [Types.ObjectId], ref: 'User', default: []}
});

hotelShema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});


const Hotel = model('Hotel', hotelShema);

module.exports = Hotel