const { register, login } = require('../services/userService');
const { parseError } = require('../utils/parser');
const validator = require('validator');

const authController = require('express').Router();



// REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER
//     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER
//         REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER


// TODO replace with actual  views
authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
});


authController.post('/register', async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const repass  = req.body.rePass;
    try{
        if(validator.isEmail(email) == false){
            throw new Error('Invalid email');
        }
        if(username == '' || password == ''){
            throw new Error('All fields are required');
        }
        if(password.length < 5){
            throw new Error('Password must be at least 5 charecters long');
        }
        if(password != repass){
            throw new Error('Passwords don\'t match');
        }

        const token = await register(email ,username, password);
        res.cookie('token', token);
        res.redirect('/'); 

    } catch(err){
        const errors = parseError(err);

        // TODO add error display to actual template
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                email: email,
                username: username
            }
        })
    }
});




// LOGIN    LOGIN     LOGIN    LOGIN     LOGIN    LOGIN     LOGIN     LOGIN    LOGIN     LOGIN
//    LOGIN    LOGIN     LOGIN    LOGIN     LOGIN    LOGIN     LOGIN     LOGIN    LOGIN     LOGIN
//       LOGIN    LOGIN     LOGIN    LOGIN     LOGIN    LOGIN     LOGIN     LOGIN    LOGIN     LOGIN


authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});


authController.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        if(email == '' || password == ''){
            throw new Error('All fields are required');
        };
        
        const token = await login(email, password);
        res.cookie('token', token);
        res.redirect('/'); 

    } catch(err){
        const errors = parseError(err);

        // TODO add error display to actual template
        res.render('login', {
            title: 'login Page',
            errors,
            body: {
                email: email
            }
        })
    }
});



// LOGOUT    LOGOUT     LOGOUT    LOGOUT     LOGOUT    LOGOUT     LOGOUT     LOGOUT    LOGOUT     LOGOUT
//    LOGOUT    LOGOUT     LOGOUT    LOGOUT     LOGOUT    LOGOUT     LOGOUT     LOGOUT    LOGOUT     LOGOUT
//       LOGOUT    LOGOUT     LOGOUT    LOGOUT     LOGOUT    LOGOUT     LOGOUT     LOGOUT    LOGOUT     LOGOUT


authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})




module.exports = authController;