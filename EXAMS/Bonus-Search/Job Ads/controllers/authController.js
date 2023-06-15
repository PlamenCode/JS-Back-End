const { login, register } = require('../services/userService');
const { parseError } = require('../utils/parser');
const { body, validationResult } = require('express-validator');

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
    body('email').isEmail().withMessage('invalid Email Address'),
    body('password').isLength({min: 5}).withMessage('Password Shoud be at lest 5 charecters long'),
async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const repass  = req.body.repass;
    const skills  = req.body.skills;

    try{
        const { errors } = validationResult(req);
        if(errors.length > 0){console.log(); throw errors };

        if(skills.length > 40 || skills.length < 1){
            throw new Error('Skills must be between 1 and 40 charecter long');
        };

        if(email == '' || password == '', skills == ''){
            throw new Error('All fields are required');
        } else if(password != repass){
            throw new Error('Passwords don\'t match');
        }

        const token = await register(email, password, skills);
        res.cookie('token', token);
        res.redirect('/'); 

    } catch(err){
        res.render('register', {
            title: 'Register Page',
            errors: parseError(err),
            body: {
                email: req.body.email,
                skills: req.body.skills,
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
        res.render('login', {
            title: 'login Page',
            errors: parseError(err),
            body: {
                email,
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