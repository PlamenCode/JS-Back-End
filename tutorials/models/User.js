const { Schema, model, Types} = require('mongoose');


const userShema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [5, 'Username must be at least 5 charecters long.'] }, // unique if allowed due to suerShema.index() below or it will not work correctly
    hashedPass: { type: String, required: true}
});

userShema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User',userShema);

module.exports = User