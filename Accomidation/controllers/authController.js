const { login, register } = require('../services/authService');
const authController = require('express').Router();
const parseError = require('../utils/parser');
const { body, validationResult } = require('express-validator');


/// Login  Login  Login  Login  Login  Login  Login
///   Login  Login  Login  Login  Login  Login  Login

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});

authController.post('/login', async (req, res) => {
    try{
        const result = await login(req.body.username, req.body.password);
        attachToken(req, res, result);
        res.redirect('/');
    }catch(err){
        res.render('login', {
            title:'Login Page',
            body: {
                username: req.body.username
            },
            error: parseError(err)
        })
    }
});



/// Register  Register  Register  Register  Register  Register  
///   Register  Register  Register  Register  Register  Register  

authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
});

authController.post('/register', 
    body('password')
    .trim()
    .isLength({min: 4}).withMessage('Password must be at least 4 char long'),
    body('username')
    .trim()
    .notEmpty().withMessage('Username is required'),
    body('repass')
    .trim()
    .custom(async (value, {req}) => {
        if(value != req.body.password){
            throw new Error('Passwords don\'t match');
        }}),

    async (req, res) => {
    try{
        const { errors } = validationResult(req);
        if(errors.length > 0){
            throw errors;
        }

        const result = await register(req.body.username, req.body.password);
        attachToken(req, res, result);
        res.redirect('/');
    } catch(err){
        res.render('register', {
            title:'Register Page',
            body: {
                username: req.body.username
            },
            error: parseError(err),
        })
    }
});


/// Logout  Logout  Logout  Logout  Logout  Logout  Logout  Logout
///   Logout  Logout  Logout  Logout  Logout  Logout  Logout  Logout

authController.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/')
})

function attachToken(req, res, data){
    const token = req.signJwt(data);
    res.cookie('jwt', token);
}


module.exports = authController;