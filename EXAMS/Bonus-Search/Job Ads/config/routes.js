const adController = require("../controllers/adController");
const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const homeController = require("../controllers/homeController");
const searchController = require("../controllers/searchController");


module.exports = (app) => {

    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/ad', adController);
    app.use('/search', searchController);

    app.use('*', (req, res) => {
        res.render('404', {
            title: 'Page Not Found',
            user: req.user
        })
    })


}