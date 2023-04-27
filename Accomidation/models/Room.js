const { Schema, model, Types } = require('mongoose');


const roomShema = new Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    beds: {type: Number, required: true, min: 1},
    price: {type: Number, required: true, min: 1},
    description: {type: String, required: true},
    imgUrl: {type: String},
    facilities: {type: [Types.ObjectId], default: [], ref: 'Facility'},
    owner: {type: Types.ObjectId, ref: 'User', required: true}
});

const Room = model('Room', roomShema);
module.exports = Room;