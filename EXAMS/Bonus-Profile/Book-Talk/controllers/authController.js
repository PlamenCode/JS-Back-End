const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../utils/parser');

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


authController.post('/register', 
body('email').isEmail().withMessage('Invalid email adress'),
async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const repass  = req.body.repass;
    try{
        const result = validationResult(req);
        if(result.length > 0){
            throw result;
        }
        if(password.length < 3){
            throw new Error('Password must be at least 3 charecters long')
        }
        if(username == '' || password == ''){
            throw new Error('All fields are required');
        } else if(password != repass){
            throw new Error('Passwords don\'t match');
        }

        const token = await register(email, username, password);
        res.cookie('token', token);
        res.redirect('/'); // TODO check where it redirects

    } catch(err){
        const errors = parseError(err);

        // TODO add error display to actual template
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username,
                email
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
        res.redirect('/'); // TODO check where it redirects

    } catch(err){
        const errors = parseError(err);

        res.render('login', {
            title: 'login Page',
            errors,
            body: {
                email
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