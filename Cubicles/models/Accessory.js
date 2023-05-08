const { Schema, model, Types} = require('mongoose');


const IMAGE_URL_REGEXP = /^https?:\/\/+/i

const accesoryShema = new Schema({
    name: {type: String, required: true},
    imageUrl: {type: String, validate: {
        validator: (value) => IMAGE_URL_REGEXP.test(value),
        message: 'invalid image url' 
    }},
    description: {type: String, maxlength: [50, 'Max description length 50 charecters long']},
});

const Accessory = model('Accessory', accesoryShema);



module.exports = Accessory
;