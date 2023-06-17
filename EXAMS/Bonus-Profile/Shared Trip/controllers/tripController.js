const { createTrip, getOneById, editTrip, deleteTrip, joinTrip, getAllTripBuddiestEmails, updateSeats } = require('../services/tripService');
const { getDriver } = require('../services/userService');
const { parseError } = require('../utils/parser');

const tripController = require('express').Router();

tripController.get('/create', (req, res) => {
    res.render('trip-create', {
        title: 'Create Trip',
        user: req.user
    })
});

tripController.post('/create', async (req, res) => {
    const startPoint = req.body.startPoint;
    const endPoint = req.body.endPoint;
    const date = req.body.date; 
    const time = req.body.time;
    const carImage = req.body.carImage; 
    const carBrand = req.body.carBrand;
    const seats = req.body.seats;
    const price = req.body.price;
    const description = req.body.description;
    const creator = req.user._id;
    
    try {
        if( startPoint == '' || endPoint == '' || date == '' || time == '' || carImage == '' ||
            carBrand == '' || seats == '' || price == '' || description == '' || creator == '' )
        { throw new Error('All felds are required') };

        const tripData = { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, creator };
        const result = await createTrip(tripData);
        res.redirect(`/trip/${result._id}/details`);
        
    } catch (err) {
        res.render('trip-create', {
            title: 'Create Trip',
            user: req.user,
            errors: parseError(err),
            body: {
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date, 
                time: req.body.time,
                carImage: req.body.carImage, 
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            }
        })
    }
});

tripController.get('/:id/details', async(req, res) => {
    const trip = await getOneById(req.params.id);
    let isOwner = false;
    if(req.user && (trip.creator.toString() == req.user._id.toString())){ isOwner = true }
    let isBuddie = false;
    if( req.user && (trip.buddies.map(x => x.toString()).includes(req.user._id.toString()))){ isBuddie = true };
    let hasSeats = false;
    if(trip.buddies.length < trip.seats){ hasSeats = true };
    const emails = (await getAllTripBuddiestEmails(req.params.id)).join(', ');
    const driver = await getDriver(trip.creator.toString());
    let seatsLeft = trip.seats;
    console.log(seatsLeft);
    
    res.render('trip-details', {
        title: 'trip Details',
        user: req.user,
        trip,
        isOwner,
        isBuddie,
        hasSeats,
        emails,
        driver
    });
});

tripController.get('/:id/edit', async (req, res) => {
    const trip = await getOneById(req.params.id);
    res.render('trip-edit', {
        title: `Edit Trip`,
        user: req.user,
        trip
    })
});

tripController.post('/:id/edit', async (req, res) => {
    const startPoint = req.body.startPoint;
    const endPoint = req.body.endPoint;
    const date = req.body.date; 
    const time = req.body.time;
    const carImage = req.body.carImage; 
    const carBrand = req.body.carBrand;
    const seats = req.body.seats;
    const price = req.body.price;
    const description = req.body.description;

    try {
        if( startPoint == '' || endPoint == '' || date == '' || time == '' || carImage == '' ||
            carBrand == '' || seats == '' || price == '' || description == '')
        { throw new Error('All felds are required') };

        const tripData = { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description };
        await editTrip(req.params.id, tripData);
        res.redirect(`/trip/${req.params.id}/details`);
        
    } catch (err) {
        console.log(err);
        res.render('trip-edit', {
            title: 'Edit Trip',
            user: req.user,
            errors: parseError(err),
            body: {
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date, 
                time: req.body.time,
                carImage: req.body.carImage, 
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            }
        })
    }
});

tripController.get('/:id/delete', async (req, res) => {
    if(req.user){
        await deleteTrip(req.params.id, req.user._id);
        res.redirect('/catalog');
    } else{
        res.redirect('/auth/login');
    }
});

tripController.get('/:id/join', async (req, res) => {
    const trip = await getOneById(req.params.id);

    console.log(trip.buddies.length, trip.seats);
    if(trip.buddies.length >= trip.seats){
        // throw new Error('No more spaces');
        return res.redirect(`/trip/${req.params.id}/details`);
    };
    if(trip.buddies.map(x => x.toString()).includes(req.user._id.toString())){
        // throw new Error('You are already on this trip');
        return res.redirect(`/trip/${req.params.id}/details`);
    };
    await joinTrip(req.params.id, req.user._id);
    res.redirect(`/trip/${req.params.id}/details`);
});

module.exports = tripController;