const express = require('express');
const expressConfig = require('./config/express')
const routesConfig = require('./config/routes');
const databaseConfig = require('./config/database');

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(3000, () => console.log('Server is listening at port 3000...'))
}




