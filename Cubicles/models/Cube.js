const { Schema, model, Types} = require('mongoose');

const IMAGE_URL_REGEXP = /^https?:\/\/+/i

const cubeShema = new Schema({
    name: {type: String, minlength: [5, 'min cube length 5 charecters long']},
    description: {type: String, minlength: [20, 'min description length 20 charecters long']},
    imageUrl: {type: String, validate: {
        validator: (value) => IMAGE_URL_REGEXP.test(value),
        message: 'invalid image url' 
    }},
    difficultyLevel: {type: Number, required: true},
    accessories: {type: [Types.ObjectId], ref: 'Accessory', default: []},
    owner: { type: Types.ObjectId, ref: 'User' }

});

const Cube = model('Cube',cubeShema);

module.exports = Cube;
