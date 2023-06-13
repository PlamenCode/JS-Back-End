const { isGuest, hasUser } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { parseError } = require('../utils/parser');
const { body, validationResult} = require('express-validator');

const authController = require('express').Router();



// REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER
//     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER
//         REGISTER    REGISTER     REGISTER    REGISTER     REGISTER    REGISTER     REGISTER


// TODO replace with actual  views
authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
});


authController.post('/register',
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength(4).withMessage('Password must be at least 4 charecters long'),
async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repass  = req.body.repass;
    try{
        const { errors } = validationResult(req);
        if(errors.length > 0){
            throw errors;
        };
        
        if(username == '' || password == '' || email == ''){
            throw new Error('All fields are required');
        } else if(password != repass){
            throw new Error('Passwords don\'t match');
        }

        // TODO check to see if register creates session or redirects to login page
        const token = await register(username, email, password);
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


authController.get('/login', isGuest(), (req, res) => {
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

        // TODO add error display to actual template
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


authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})




module.exports = authController;