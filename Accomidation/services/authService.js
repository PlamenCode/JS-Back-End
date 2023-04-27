const bcrypt = require('bcrypt');
const User = require('../models/User');


async function login(username, password){
    const user = await User.findOne({username}).collation({locale: 'en', strength: 2});
    if(!user){
        throw new Error('Incorrect username or password');
    };

    const match = await bcrypt.compare(password, user.hashedPass);
    if(!match){
        throw new Error('Incorrect username or password');
    };

    return {
        _id: user._id,
        username: username,
        roles: user.roles
    }  
};


async function register(username, password){

    const existing = await User.findOne({username}).collation({locale: 'en', strength: 2});
    if(existing){
        throw new Error('Username is taken');
    };

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        hashedPass
    });
    return { username, roles: user.roles };
};


module.exports = {
    login,
    register
}