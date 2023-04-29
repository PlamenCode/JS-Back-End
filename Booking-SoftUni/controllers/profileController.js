const { hasUser } = require('../middlewares/guards');
const { getUserBookings } = require('../services/hotelService');

const profileController = require('express').Router();


profileController.get('/', hasUser(), async (req, res) => {
    const bookings = await getUserBookings(req.user._id);
    res.render('profile', {
        title: 'Profile',
        user: Object.assign({bookings: bookings}, req.user)
    })
});

module.exports = profileController