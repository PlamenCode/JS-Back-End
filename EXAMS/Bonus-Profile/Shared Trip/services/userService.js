const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Secret af';


async function register(email, password, gender){
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if(existing){
        throw new Error('email is taken');
    };

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPass,
        gender
    })

    // TODO See if task requires the user to be logged in after registration or to be redirected to login page
    return createSession(user);
};

async function login(email, password){
    const user = await User.findOne({email}).collation({ locale: 'en', strength: 2 });
    if(!user){
        throw new Error('Incorrect username or password');
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
    };

    return jwt.sign(payload, JWT_SECRET);
};

function verifyToken(token){
    return jwt.verify(token, JWT_SECRET);
};

async function getUserEmail(userId){
    const user = await User.findById(userId).lean();
    return user?.email;
};

async function getDriver(userId){
    const user = await User.findById(userId).lean();
    return user.email;
};

async function getProfile(userId){
    return await User.findById(userId).lean();
};


module.exports = {
    register,
    login,
    verifyToken,
    getUserEmail,
    getDriver,
    getProfile,
}