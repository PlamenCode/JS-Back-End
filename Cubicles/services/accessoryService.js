const Accessory = require("../models/Accessory");

async function getAllAccessory() {
    const result = await Accessory.find({}).lean();
    return result;
}

async function createAccessory(name, description, imageUrl) {
    await Accessory.create({
        name,
        description,
        imageUrl
    });
    return;
};

module.exports = {
    getAllAccessory,
    createAccessory
}