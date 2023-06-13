const { Schema, model, Types} = require('mongoose');

const userShema = new Schema({
    email: {type: String, required: true, unique: true },
    firstName: {type: String, required: true, minlength: [1, 'min first name lenght shoud be 1 charecter']},
    lastName: {type: String, required: true, minlength: [1, 'min last name lenght shoud be 1 charecter']},
    hashedPass: { type: String, required: true},
});


userShema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User',userShema);

module.exports = User