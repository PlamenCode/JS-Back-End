const aboutControler = require("../controllers/aboutControllers");
const attachControllers = require("../controllers/attachControllers");
const createControler = require("../controllers/createContollers");
const detailControler = require("../controllers/detailControllers");
const homeControler = require("../controllers/homeControllers");
const authController = require('../controllers/authController');
const { hasUser } = require("../middlewares/guards");



module.exports = (app) => {

    app.use('/', homeControler);
    app.use('/create', hasUser(), createControler);
    app.use('/details', detailControler);
    app.use('/attach', hasUser(), attachControllers);
    app.use('/about', aboutControler);
    app.use('/auth', authController);
    app.use('*', detailControler);
}