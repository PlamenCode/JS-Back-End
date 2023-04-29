const { Schema, model, Types} = require('mongoose');


const userShema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only en letters and numbers.']}, // unique if allowed due to suerShema.index() below or it will not work correctly
    hashedPass: { type: String, required: true},
});

userShema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userShema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User',userShema);

module.exports = User