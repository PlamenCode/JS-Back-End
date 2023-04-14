const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/catalogPage.html')
});

router.get('/:id', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/catalogPage.html')
});

module.exports = router;
