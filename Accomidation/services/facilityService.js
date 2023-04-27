const Facility = require('../models/Facility');
const Room = require('../models/Room')


async function getAllFacilities(){
    return Facility.find({}).lean();
};

async function createFacility(label, iconUrl){
    return Facility.create({ label, iconUrl});
};



async function addFacility(roomId, facilityIds){
    const room = await Room.findById(roomId).populate('facilities');
    const facilities = await Facility.find({_id: {$in: facilityIds}});

    // Remove room ref from removed facilities
    const toRemove = room.facilities.filter(f => facilities.every(x => x._id.toString() != f._id.toString()));
    console.log('TO REMOVE:', toRemove.map(x => x.label));
    toRemove.forEach(f => {
        // Remove room from facility
        f.rooms.splice(f.rooms.findIndex(rid => rid.toString() == roomId), 1);
        // Remove facility from room
        room.facilities.splice(room.facilities.findIndex(x => x._id.toString() == f._id.toString()), 1);
    });

    // Determene new facilities
    const newFacilities = facilities.filter(f => room.facilities.every(x => x._id.toString() != f._id.toString()));
    console.log('NEW FACILITIES', newFacilities.map(x => x.label));

    // Add room ref to newly added facilities
    newFacilities.forEach(f => {
        room.facilities.push(f);
        f.rooms.push(room);
    });

    await room.save();
    await Promise.all(toRemove.map(x => x.save()));
    await Promise.all(newFacilities.map(x => x.save()));
};

module.exports = {
    getAllFacilities,
    createFacility,
    addFacility
}

