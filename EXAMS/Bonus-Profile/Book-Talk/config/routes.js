const { createConnection } = require("mongoose");
const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const homeController = require("../controllers/homeController");
const createController = require("../controllers/createController");
const detailsController = require("../controllers/detailsController");
const bookController = require("../controllers/bookController");
const { hasUser } = require("../middlewares/guards");
const profileController = require("../controllers/profileController");


module.exports = (app) => {

    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/create', hasUser(), createController);
    app.use('/details', detailsController);
    app.use('/book', hasUser(), bookController);
    app.use('/profile', profileController);
    app.use('*', (req, res) => { res.render('404', { title: 'Page Not Found' }) });
}