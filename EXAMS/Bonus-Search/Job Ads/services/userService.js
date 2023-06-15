const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Secret af';


async function register(email, password, skills){
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if(existing){
        throw new Error('Email is taken');
    };

    const hashedPass = await bcrypt.hash(password, 10);

    console.log(email, password, skills);
    const user = await User.create({
        email,
        hashedPass,
        skills
    })
    return createSession(user);
};

async function login(email, password){
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
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
        username: user.username,
        skills: user.skills
    };

    return jwt.sign(payload, JWT_SECRET);
};

function verifyToken(token){
    return jwt.verify(token, JWT_SECRET);
};

async function getUserEmail(userId){
    const user = await User.findById(userId);
    return user.email;
}

async function getAllCandidatesInfo(userIdArray){
    let allUsers = [];
    for (const userId of userIdArray) {
        const currentUser = await User.findById(userId);
        const userInfo = {
            email: currentUser.email,
            skills: currentUser.skills
        };
        allUsers.push(userInfo);
    };
    return allUsers;
}


module.exports = {
    register,
    login,
    verifyToken,
    getUserEmail,
    getAllCandidatesInfo
}