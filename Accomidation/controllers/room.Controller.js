const { getById, create, update, deleteById } = require('../services/roomService');
const parseError = require('../utils/parser');



const roomControler = require('express').Router();


roomControler.get('/:id/edit', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if(!req.user || room.owner != req.user._id){
        return res.redirect('/auth/login')
    }

    res.render('edit', {
        title: 'Edit Page',
        room
    })
});

roomControler.post('/:id/edit', async (req, res) => {
    const roomId = req.params.id;

    const room = await getById(roomId);

    if(!req.user || room.owner != req.user._id){
        return res.redirect('/auth/login')
    }

    try{
        const result = await update(roomId, req.body);
        res.redirect(`/catalog/${result._id}`);
    } catch(err){
        req.body._id = roomId
        res.render('edit', {
            title: 'Edit Page',
            error: err.message,
            room: req.body
        });
    }
});


roomControler.get('/:id/delete', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if(!req.user || room.owner != req.user._id){
        return res.redirect('/auth/login')
    }

    res.render('delete', {
        title: 'Delete Page',
        room
    })
});


roomControler.post('/:id/delete', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if(!req.user || room.owner != req.user._id){
        return res.redirect('/auth/login')
    };

    try{
        await deleteById(roomId);
        res.redirect(`/catalog`);
    } catch(err){
        const error = parseError(err);
        console.log(error);

        req.body._id = roomId
        res.render('delete', {
            title: 'Delete Page',
            error,
            room: req.body
        });
    }

})


module.exports = roomControler