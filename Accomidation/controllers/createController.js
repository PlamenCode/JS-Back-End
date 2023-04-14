const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create',{
        title: 'Create Page'
    });
});

module.exports = router;