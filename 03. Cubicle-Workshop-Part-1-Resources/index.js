const express = require('express');
const hbs = require('express-handlebars');
const handlebars = hbs.create({extname: '.hbs'});


const app = express();
app.engine('.hbs', handlebars.engine);
app.set('viex engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.listen(3000, () => console.log('Server is listening on port 3000...'))