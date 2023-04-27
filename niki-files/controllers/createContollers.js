const createControler = require('express').Router();
const { createCube } = require('../services/servicesCube');
const { createAccessory } = require('../services/servicesAccessory');
const { parserError } = require('../until/parser');


createControler.get('/cube', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

createControler.post('/cube', async (req, res) => {
    const body = req.body;
    const cubeData = {
        name: body.name, 
        description: body.description,
        imageUrl: body.imageUrl, 
        difficultyLevel: Number(body.difficultyLevel), 
        owner: req.user._id
    }
    try{
        if(body.name == '' || body.description == '' || body.imageUrl == '' || body.difficultyLevel == '') {
            throw new Error('All fields is required');
        }
    
        await createCube(cubeData)
        res.redirect('/')
    } catch(err) {
        const errors = parserError(err);

        res.render('create', {
            title: 'Create Cube Page',
            body: cubeData,
            errors,
        })
    }
})

createControler.get('/accessory', (req, res) => {
    res.render('accessory', { title: 'Attach Accessory' });
})

createControler.post('/accessory', async (req, res) => {
    const body = req.body;
    try {
        if(body.name == '' || body.imageUrl == '' || body.description == '') {
            throw new Error('All fields are required');
        }

        await createAccessory(body.name, body.imageUrl, body.description)
        res.redirect('/');
    } catch(err) {
        const errors = parserError(err);

        res.render('accessory', {
            title: 'Attach Accessory',
            body: {
                name: body.name,
                imageUrl: body.imageUrl,
                description: body.description,
            },
            errors,
        })

    }
})

module.exports = createControler;