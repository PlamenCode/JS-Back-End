const { Schema, model, Types} = require('mongoose');

// TODO add properties and validation according to the task
const userShema = new Schema({
    username: { type: String, required: true, minlength: [4, 'Username must be at least 4 charecters long']}, 
    email: { type: String, required: true, minlength: [10, 'Email must be at least 10 charecters long']},
    hashedPass: { type: String, required: true}
});

userShema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User',userShema);

module.exports = User