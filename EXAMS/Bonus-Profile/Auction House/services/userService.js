const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Secret af';


async function register(email, firstName, lastName, password){
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if(existing){
        throw new Error('Email is taken');
    };

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
        email, 
        firstName, 
        lastName,
        hashedPass
    })

    // TODO See if task requires the user to be logged in after registration or to be redirected to login page
    return createSession(user);
};



async function login(email, password){
    const user = await User.findOne({email}).collation({ locale: 'en', strength: 2 });
    if(!user){
        throw new Error('Incorrect email or password');
    };

    const hasMatch = await bcrypt.compare(password, user.hashedPass);
    if(hasMatch == false){
        throw new Error('Incorrect email or password');
    };

    return createSession(user);
};



function createSession(user){
    const payload = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };

    return jwt.sign(payload, JWT_SECRET);
};



function verifyToken(token){
    return jwt.verify(token, JWT_SECRET);
};

async function getCurrentbidderName(userId){
    const user = await User.findById(userId);
    let fName = user.firstName;
    let lName = user.lastName;
    return {fName, lName}
}


module.exports = {
    register,
    login,
    verifyToken,
    getCurrentbidderName
}