const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const coinController = require("../controllers/coinController");
const createController = require("../controllers/createController");
const detailsController = require("../controllers/details.Controller");
const homeController = require("../controllers/homeController");
const searchController = require("../controllers/searchController");
const { hasUser } = require("../middlewares/guards");


module.exports = (app) => {

    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/create', hasUser(), createController);
    app.use('/details', detailsController);
    app.use('/coin', coinController);
    app.use('/search', searchController);

    app.use('*', (req, res) => {
        res.render('404',{
            title: '404 Not Found'
        })
    })

}