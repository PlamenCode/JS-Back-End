// TODO: Require Controllers...
const aboutControler = require("../controllers/aboutControllers");
const attachControllers = require("../controllers/attachControllers");
const authorization = require("../controllers/authorizationContollers");
const createControler = require("../controllers/createContollers");
const defaultControler = require("../controllers/defaultControllers");
const detailControler = require("../controllers/detailControllers");
const homeControler = require("../controllers/homeControllers");
const { hasUser } = require("../middleware/guards");

module.exports = (app) => {
    app.use('/', homeControler);
    app.use('/create', hasUser(), createControler);
    app.use('/details', detailControler);
    app.use('/attach', hasUser(), attachControllers);
    app.use('/about', aboutControler);
    app.use('/auth', authorization);
    app.use('*', defaultControler);
};