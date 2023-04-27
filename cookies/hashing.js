const bcrypt = require('bcrypt');

async function hashPass(pass){
    return bcrypt.hash(pass, 10);
};

async function comparePass(pass, hashedPass){
    return bcrypt.compare(pass, hashedPass)
};

