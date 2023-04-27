const bcrypt = require('bcrypt')
const express = require('express');
const session = require('express-session'); 
const { register, login, users } = require('./userService');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'My Secret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));



// ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS
//    ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS
//       ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS     ROUTS


// Home  Home  Home  Home  Home  Home  Home  Home

app.get('/', (req, res) => {
    const user = req.session.user;
        res.send(homeTemp(user, users));
});


// Login  Login  Login  Login  Login  Login  Login

app.get('/login', (req, res) => {
    res.send(loginTemp())
});

app.post('/login', async (req, res) => {

    try{
        const result = await login(req.body.username, req.body.password)
        req.session.user = result.username;
        res.redirect('/');
    } catch(err){
        res.status(401).send(loginTemp(err.message))
    }
})


// Register  Register  Register  Register  Register 

app.get('/register', (req, res) =>{
    res.send(registerTemp());
});

app.post('/register', async (req, res) =>{
    try{
        if ( req.body.password != req.body.rePass ){
            throw new Error('Passwords don\'t match.');
        } else if ( req.body.username == '' && req.body.password == '' ){
            throw new Error(`All fields are required.`);

        } 
        await register(req.body.username, req.body.password);
        res.redirect('/');

    } catch(err){
        res.send(registerTemp(err.message));
    }
})


app.listen(3000)





// TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     
//    TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES    
//       TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES     TEMPLATES    

const homeTemp = (user, users) => {
    return `<h1>Hello, ${user ? user : 'guest'}</h1>
    ${ user ? '' 
        : `<p>Go to <a href="/login">Login</a></p>
           <p>Go to <a href="/register">Regster</a></p>`
    }
      ${users? users.map(x => `<li>${x.username} -- ${x.failedAttempts}</li>`).join('') : ''}`
};

const incorectTemp = (text) => {
    return `
    <h1>${text}</h1>
    <h3>Return to <a href="/login">Login</a></h3>
    <p>Return to <a href="/">Home</a></p>`
}


const loginTemp = (err) => { return `
<h1>Login Form</h1>
${err ? `<p>${err}</p>` : ''}
<form action="/login" method="post">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <input type="submit" value="Login">
</form>
<p>Return to <a href="/">Home</a></p>
<p>Go to <a href="/register">Register</a></p>`
};


const registerTemp = (error) => { return `
<h1>Register Form</h1>
${error ? `<p>${error}</p>`: ''}
<form action="/register" method="post">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat Password: <input type="password" name="rePass"></label>
    <input type="submit" value="Register">
</form>
<p>Return to <a href="/">Home</a></p>
<p>Return to <a href="/login">login</a></p>`}




