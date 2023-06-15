const adController = require('express').Router();
const { createAd, findAdById, updateAd, deleteAdById, apply } = require('../services/adService');
const { getUserEmail, getAllCandidatesInfo } = require('../services/userService');
const { parseError } = require('../utils/parser');

adController.get('/create', (req, res) => {
    res.render('create',{
        title: 'Create Ad Page',
        user: req.user
    })
});

adController.post('/create', async (req, res) => {
    const headline = req.body.headline;
    const location = req.body.location;
    const companyName = req.body.companyName;
    const companyDescription = req.body.companyDescription;

    try {
        if(headline == '' || location == '' || companyName == '' || companyDescription == ''){
            throw new Error('All fields are required');
        };

        const ad = {
            headline: headline,
            location: location,
            companyName: companyName,
            companyDescription: companyDescription,
        };

        await createAd(ad, req.user._id);
        res.redirect('/catalog');
        
    } catch (err) {
        const errors = parseError(err).join(',');
        res.render('create', {
            title: 'Create Ad Page',
            user: req.user,
            errors,
            body: {
                headline: req.body.headline,
                location: req.body.location,
                companyName: req.body.companyName,
                companyDescription: req.body.companyDescription
            }
        })
    }
});

adController.get('/details/:id', async (req, res) => {
    const currentAd = await findAdById(req.params.id);
    const adOwnerEmail = await getUserEmail(currentAd.author);

    const isUser = !!req.user;

    let isOwner = false;
    if(req.user && (currentAd.author.toString() == req.user._id.toString())){
        isOwner = true;
    };

    let hasApplied = false;
    const currentApplies = currentAd.userApplies.map(x => x.toString())
    if( req.user && (currentApplies.includes(req.user._id.toString()))){
        hasApplied = true;
    };

    const allAppliersInfo = await getAllCandidatesInfo(currentApplies);

    res.render('details', {
        title: `${currentAd.headline} Details`,
        user: req.user,
        add: currentAd,
        adOwnerEmail,
        isUser,
        isOwner,
        hasApplied,
        allAppliersInfo
    });
});

adController.get('/edit/:id', async (req, res) => {
    const ad = await findAdById(req.params.id);
    if(req.user._id.toString() != ad.author.toString()){
        res.redirect(`/ad/details/${ad._id}`);
    };
    res.render('edit', {
        title: `${ad.headline} Edit`,
        user: req.user,
        body: {
            headline: ad.headline,
            location: ad.location,
            companyName: ad.companyName,
            companyDescription: ad.companyDescription,
            _id: ad._id
        }
    })
});

adController.post('/edit/:id', async (req, res) => {
    const headline = req.body.headline;
    const location = req.body.location;
    const companyName = req.body.companyName;
    const companyDescription = req.body.companyDescription;

    try {
        if(headline == '' || location == '' || companyName == '' || companyDescription == ''){
            throw new Error('All fields are required');
        };

        const ad = {
            headline: headline,
            location: location,
            companyName: companyName,
            companyDescription: companyDescription,
        };

        await updateAd(req.params.id, ad);
        res.redirect('/catalog');
        
    } catch (err) {
        const errors = parseError(err).join(',');
        res.render('edit', {
            title: 'Create Ad Page',
            user: req.user,
            errors,
            body: {
                headline: req.body.headline,
                location: req.body.location,
                companyName: req.body.companyName,
                companyDescription: req.body.companyDescription,
                _id: req.params.id
            }
        })
    }
});

adController.get('/delete/:id', async (req, res) => {
    await deleteAdById(req.params.id, req.user._id);
    res.redirect('/catalog')
});

adController.get('/apply/:id', async (req, res) => {
    const ad = await findAdById(req.params.id);
    const usersApplied = ad.userApplies.map(x => x.toString());
    if(!usersApplied.includes(req.user._id.toString())){
        await apply(req.params.id, req.user._id);
    };
    res.redirect(`/ad/details/${req.params.id}`)
});

module.exports = adController;