const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const homeController = require("../controllers/homeController");
const tripController = require("../controllers/tripController");


module.exports = (app) => {

    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/trip', tripController);
    app.use('/catalog', catalogController);

    app.use('*', (req, res) => {
        res.render('404', {
            title:'Page Not Found',
            user: req.user 
        })
    })

}