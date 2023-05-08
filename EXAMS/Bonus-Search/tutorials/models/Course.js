const { Schema, model, Types} = require('mongoose');

const URL_PATTERN = /https?:\/\/./i

const courseShema = new Schema({
    title: { type: String, minlength: [4, 'Min title length 4 charecters']},
    description: { type: String,
        minlength: [20, 'Min description length 20 charecters'],
        maxlength: [50, 'Max description length 50 charecters']},
    imageUrl: { type: String, validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Invalid image Url'
    }},
    duration: { type: String, required: [true, 'duration is required']},
    createdAt: { type: String, required: true, default: () => (new Date()).toISOString().slice(0, 10 )},
    users: { type: [Types.ObjectId], ref: 'User', default: []},
    userCount: { type: Number, default: 0},
    owner: { type: Types.ObjectId, ref: 'User'}
});

courseShema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2 
    }
});

const Course = model('Course', courseShema);

module.exports = Course;