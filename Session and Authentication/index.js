const express = require("express");
const hbs = require('express-handlebars').create({ extname: ".hbs" });
const cookieParser = require('cookie-parser');

const mainController = require("./controllers/mainController");
const loginController = require("./controllers/loginController");
const registerController = require("./controllers/registerController");
const catalogController = require("./controllers/catalogController");
const cookieService = require("./services/cookieService");


const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use(cookieParser())
app.use(mainController);
app.use('/login', loginController);
app.use('/register', registerController);
app.use('/catalog', catalogController);

app.listen(3000)