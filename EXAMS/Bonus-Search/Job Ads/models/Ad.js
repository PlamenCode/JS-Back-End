const { Schema, model, Types } = require('mongoose');

const adSchema = new Schema({
    headline: {type: String, required: [true, 'Headline is required'], minlength: [4, 'headline shoud be at least 4 charecters long']},
    location: {type: String, required: [true, 'location is required'], minlength: [8, 'location shoud be at least 8 charecters long']},
    companyName: {type: String, required: [true, 'companyName is required'], minlength: [3, 'companyName shoud be at least 3 charecters long']},
    companyDescription: {type: String, required: [true, 'companyDescription is required'], maxlength: [40, 'companyDescription shoud be at most 40 charecters long']},
    author: {type: Types.ObjectId, ref: 'User', required: true},
    userApplies: {type: [Types.ObjectId], ref: 'User', default: [], required: true}
});

const Ad = model('Ad', adSchema);
module.exports = Ad;
