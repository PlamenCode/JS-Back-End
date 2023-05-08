const { Schema, model, Types} = require('mongoose');

const userShema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [4, 'Username must be at least 4 charecters long.'] }, // unique if allowed due to suerShema.index() below or it will not work correctly
    email: { type: String, required: true, unique: true},
    hashedPass: { type: String, required: true}
});

userShema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userShema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User',userShema);

module.exports = User