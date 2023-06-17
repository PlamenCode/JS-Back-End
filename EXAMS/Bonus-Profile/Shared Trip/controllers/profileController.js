const { getProfile } = require('../services/userService');

const profileController = require('express').Router();

profileController.get('/', async(req, res) => {
    const profile = await getProfile(req.user._id);
    let pic;
    if(profile.gender === 'male'){ pic = 'male'
    } else { pic = 'female'};

    res.render('profile', {
        title: `${profile.email} Profile`,
        user: req.user,
        profile,
        pic
    })
});

module.exports = profileController