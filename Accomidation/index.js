const express = require('express');
const hbs = require('express-handlebars').create({ extname: ".hbs" });

const homeController = require('./controllers/homeController');
const defaultController = require('./controllers/defaultController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');
const defaultTitle = require('./middlewares/defaultTitle');




const app = express();
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.listen(3000, () => console.log('Server is listening at port 3000...'))


app.use(defaultTitle('Default Title'))

app.use(homeController);
app.use('/catalog', catalogController);
app.use('/create', createController);



app.all('*', defaultController);

