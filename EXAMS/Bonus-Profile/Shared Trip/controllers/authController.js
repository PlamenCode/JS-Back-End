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


authController.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const repass  = req.body.repass;
    let gender = req.body.gender;

    try{
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(!regex.test(email)){ throw new Error('Invalid email') };

        if(password.length < 4){
            throw new Error('Password must be at least 4 charecters long')
        }
        
        if(email == '' || password == '' || gender == ''){
            throw new Error('All fields are required');
        } else if(password != repass){
            throw new Error('Passwords don\'t match');
        }

        // TODO check to see if register creates session or redirects to login page
        const token = await register(email, password, gender);
        res.cookie('token', token);
        res.redirect('/'); // TODO check where it redirects

    } catch(err){
        const errors = parseError(err);
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                email,
                gender
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