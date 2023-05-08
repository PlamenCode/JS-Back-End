const { register, login } = require('../services/userService');
const { parserError } = require('../utils/parser');

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
    const username = req.body.username;
    const password = req.body.password;
    const repass  = req.body.repass;
    try{
        if(username == '' || password == ''){
            throw new Error('All fields are required');
        } else if(password != repass){
            throw new Error('Passwords don\'t match');
        }

        // TODO check to see if register creates session or redirects to login page
        const token = await register(username, password);
        res.cookie('token', token);
        res.redirect('/'); // TODO check where it redirects

    } catch(err){
        const errors = parseError(err);

        // TODO add error display to actual template
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


authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});


authController.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        if(username == '' || password == ''){
            throw new Error('All fields are required');
        };
        
        const token = await login(username, password);
        res.cookie('token', token);
        res.redirect('/'); // TODO check where it redirects

    } catch(err){
        const errors = parseError(err);

        // TODO add error display to actual template
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