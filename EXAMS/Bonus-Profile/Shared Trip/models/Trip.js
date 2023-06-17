const { Schema, model, Types} = require('mongoose');

const URL_PATTERN = /https?:\/\/./i

const tripSchema = new Schema({
    startPoint: {type: String, required: [true, 'startPoint is required'], minlength: [4, 'startPoint shoud be at least 4 charecters long']},
    endPoint: {type: String, required: [true, 'endPoint is required'], minlength: [4, 'endPoint shoud be at least 4 charecters long']},
    date: {type: String, required: [true, 'date is required']},
    time: {type: String, required: [true, 'time is required']},
    carImage: {type: String, required: [true, 'carImage is required'], validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Invalid image Url'
    }},
    carBrand: {type: String, required: [true, 'carBrand is required'], minlength: [4, 'the brand shoud be at least 4 charecters long']},
    seats: {type: Number, required: [true, 'seats is required'], min: [0, 'seats shoud be a positive number'], max: [4, 'maximum space is 4 seats']},
    price: {type: Number, required: [true, 'price is required'], min: [0, 'price must be above 0'], max: [50, 'max price is 50']},
    description: {type: String, required: [true, 'description is required'], minlength: [10, 'description should be at least 10 charecters long']},
    creator: {type: Types.ObjectId, ref: 'User', required: [true, ' is required']},
    buddies: {type: [Types.ObjectId],ref: 'User', default: [], required: [true, ' is required']},
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;