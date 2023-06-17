const Trip = require("../models/Trip");
const { getUserEmail } = require("./userService");

async function getAll(){
    const trips = await Trip.find({}).lean(); 
    return trips
};

async function getOneById(tripId){
    return await Trip.findById(tripId).lean();
};

async function createTrip(tripData){
    return await Trip.create(tripData);
};

async function editTrip(tripId, tripData){
    let trip = await Trip.findById(tripId);

    trip.startPoint = tripData.startPoint;
    trip.endPoint = tripData.endPoint;
    trip.date = tripData.date; 
    trip.time = tripData.time;
    trip.carImage = tripData.carImage; 
    trip.carBrand = tripData.carBrand   ; 
    trip.seats = tripData.seats;
    trip.price = tripData.price;
    trip.description = tripData.description;

    return trip.save();
};

async function deleteTrip(tripId, userId){
    const trip = await Trip.findById(tripId).lean();
    if(trip.creator.toString() == userId.toString()){
        return await Trip.findByIdAndDelete(tripId);
    };
    return;
};

async function joinTrip(tripId, userId){
    const trip = await Trip.findById(tripId);
    if(trip.buddies.length < trip.seats){
        trip.buddies.push(userId);
        trip.seats = Number(trip.seats) - 1;
    };
    return trip.save();
};

async function getAllTripBuddiestEmails(tripId){
    const trip = await Trip.findById(tripId).lean();
    const tripBuddiestEmails = [];
    const tripBuddies = trip.buddies.map(x => x.toString());
    for (const buddieId of tripBuddies) {
        const email = await getUserEmail(buddieId);
        tripBuddiestEmails.push(email);
    };
    console.log(tripBuddiestEmails);
    return tripBuddiestEmails;
};

module.exports = {
    getAll,
    getOneById,
    createTrip,
    editTrip,
    deleteTrip,
    joinTrip,
    getAllTripBuddiestEmails,
}