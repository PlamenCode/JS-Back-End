const auctionController = require("../controllers/auctionController");
const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const detailsController = require("../controllers/detailsController");
const homeController = require("../controllers/homeController");
const publishController = require("../controllers/publishController");


module.exports = (app) => {

    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/publish', publishController);
    app.use('/browser', catalogController);
    app.use('/details', detailsController);
    app.use('/auction', auctionController);


    app.use('*', (req, res) =>{
        res.render('404', {
            title: 'Page Not Found'
        })
    })


}