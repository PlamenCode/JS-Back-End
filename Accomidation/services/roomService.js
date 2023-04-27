const Room = require('../models/Room')


function getAll(search) {
    return Room.find({}).lean();
};

function getById(id) {
    return Room.findById(id).populate('facilities', 'label iconUrl').lean();
};

async function create(roomData, ownerId) {
    const room = {
        name: roomData.name,
        city: roomData.city,
        beds: Number(roomData.beds),
        price: Number(roomData.price),
        description: roomData.description,
        imgUrl: roomData.imgUrl,
        owner: ownerId
    };

    if (Object.values(room).some(v => !v)) {
        throw new Error('All fields are required.')
    }
    if (typeof (room.beds) != 'number' || typeof (room.price) != 'number') {
        throw new Error('Fields beds and price must be numbers.')
    }

    const result = await Room.create(room);
    return result;
};


async function update(roomId, roomData) {

    const room = await Room.findById(roomId);

    room.name = roomData.name;
    room.city = roomData.city;
    room.beds = Number(roomData.beds);
    room.price = Number(roomData.price);
    room.description = roomData.description;
    room.imgUrl = roomData.imgUrl;

    await room.save();
    return room;
};


async function deleteById(roomId){
    return Room.findByIdAndRemove(roomId)
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}