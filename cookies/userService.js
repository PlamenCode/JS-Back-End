const bcrypt = require('bcrypt');
const users = [];

async function register(username, password){
    if(users.find(user => user.username.toLowerCase() == username.toLowerCase())){
        throw new Error('Username is taken.');
    };

    const user = {
        username,
        hashPass: await bcrypt.hash(password, 10),
        failedAttempts: 0,
        role: ['user']
    }
    users.push(user);
};

async function login(username, password){
    const user = users.find(user => user.username.toLowerCase() == username.toLowerCase());
    
    if(!user){
        throw new Error('Incorect username or password.');

    } else {
        if(user.failedAttempts >= 3){
            throw new Error('this profile has been locked.Please contact admin.')
        }
        const success =  await bcrypt.compare(password, user.hashPass);
        console.log(success);
        if(success){
            user.failedAttempts = 0;
            return user;
        } else {
            user.failedAttempts++;
            throw new Error('Incorect username or password.');

        }
    }
};

module.exports = {
    register,
    login,
    users
}