const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const createController = require("../controllers/createController");
const gameController = require("../controllers/gameController");
const homeController = require("../controllers/homeController");
const { hasUser } = require("../middlewares/guards");


module.exports = (app) => {

    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/create', hasUser(), createController);
    app.use('/game', hasUser(), gameController);
    app.use('*', (req, res) =>{
        res.render('404', {
            title: 'Route not found'
        })
    });
}