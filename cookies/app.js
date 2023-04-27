const app = require('express')();
const cookieParser = require('cookie-parser');
const session = require('express-session'); 


//app.use(cookieParser())
app.use(session({
    secret: 'My Secret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

app.get('/', (req, res) =>{
    console.log(req.session);

    req.session.message = 'Hello'
    res.cookie('cookiePrser', 1)
    res.send('Hello')
})

app.listen(3000);