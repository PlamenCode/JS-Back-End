const { Schema, model, Types } = require('mongoose');

const facilitiesShema = new Schema({
    label: {type: String, required: [true, 'label is required']},
    iconUrl: {type: String, minlength: [1, 'Min length for the url is 1 charecter.']},
    rooms: {type: [Types.ObjectId], default: [], ref: 'Room'} 
});

const Facility = model('Facility', facilitiesShema);
module.exports = Facility;