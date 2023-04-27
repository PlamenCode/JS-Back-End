const { getAll, getById } = require('../services/roomService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    
    const user = req.user;

    const search = req.query.search || ''; 
    const rooms = await getAll(search);

    res.render('catalog', {
        title: 'Catalog Page',
        rooms,
        search
    });
});

router.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if(req.user && req.user._id == room.owner){
        room.isOwner = true;
    }

    if(room){
        res.render('details', {
            title: 'Item Details',
            room,
        });
    } else {
        res.render('roomNotFound', {
            title: 'roomNotFound',
            roomId
        })
    }
});

module.exports = router;
