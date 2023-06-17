const { Schema, model, Types} = require('mongoose');

const userShema = new Schema({
    email: { type: String, required: [true, 'email is required'], unique: true, }, 
    hashedPass: { type: String, required: true},
    gender: { type: String, required: [true, 'gender is required']}
});

userShema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User',userShema);

module.exports = User