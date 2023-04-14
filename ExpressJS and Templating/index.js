const express  = require('express');
const catalogContoler = require('./catalogControler')
const createControler = require('./createControler')
const homeControler = require('./homeControler')
const aboutControler = require('./aboutControler')


const app = express();
app.listen(3000, () => console.log('Server is listening at port 3000...'));

app.use(express.static('static'))
app.use('/catalog', catalogContoler)
app.use('/create', createControler)
app.use(homeControler)
app.use('/about', aboutControler)



