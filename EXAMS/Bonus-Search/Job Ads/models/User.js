const { Schema, model, Types} = require('mongoose');

const userShema = new Schema({
    email: {type: String, required: [true, 'Email is required'], unique: true},
    hashedPass: { type: String, required: true},
    skills: {type: String, required: [true, 'Skills are required']}
});

userShema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userShema);

module.exports = User