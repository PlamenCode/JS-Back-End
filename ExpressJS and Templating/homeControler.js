const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/homePage.html')
})

module.exports = router;