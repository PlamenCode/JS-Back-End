const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../utils/parser');
const { isGuest } = require("../middlewares/guards");


const authController = require('express').Router();



// REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER
//     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER
//         REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER


authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
});


authController.post('/register', isGuest(),
    body('username').isLength({min: 5}).withMessage('Username must be at least 5 charecters long')
        .isAlphanumeric().withMessage('Username must contain only en letters and numbers'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 charecters long')
        .isAlphanumeric().withMessage('Username must contain only en letters and numbers'),
async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const repass  = req.body.repass;
    try{
        const { errors } = validationResult(req);
        if(errors.length > 0 ){
            throw errors
        }
        if(password != repass){
            throw new Error('Passwords don\'t match');
        }


        const token = await register(username, password);
        res.cookie('token', token);
        res.redirect('/'); 

    } catch(err){
        const errors = parseError(err);

        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username
            }
        })
    }
});




// LOGIN    LOGIN     LOGIN    LOGIN     LOGIN    LOGIN     LOGIN     LOGIN    LOGIN     LOGIN
//    LOGIN    LOGIN     LOGIN    LOGIN     LOGIN    LOGIN     LOGIN     LOGIN    LOGIN     LOGIN
//       LOGIN    LOGIN     LOGIN    LOGIN     LOGIN    LOGIN     LOGIN     LOGIN    LOGIN     LOGIN


authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});


authController.post('/login', isGuest(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        if(username == '' || password == ''){
            throw new Error('All fields are required');
        };
        
        const token = await login(username, password);
        res.cookie('token', token);
        res.redirect('/'); 

    } catch(err){
        const errors = parseError(err);

        res.render('login', {
            title: 'login Page',
            errors,
            body: {
                username
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