const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/createPage.html')
});
router.post('/', (req, res) => {
    res.status(200);
    res.redirect('/')
})

module.exports = router;