module.exports = (...excludedKey) => (req, res, next) => {
    if(req.body) {
        for(const key in req.body) {
            /*
            if(excludedKey.includes(key)) {
                continue
            }
            or
            if(excludedKey.includes(key) == false) {
                req.body[key] = req.body[key].trim();
            }
            */
            req.body[key] = req.body[key].trim();
        }
    }

    next();
}