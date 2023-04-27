const Accessory = require("../models/Accessory");


async function getAllAccessory() {
    const result = await Accessory.find({}).lean();
    return result;
}

async function createAccessory(name, imageUrl, description) {
    await Accessory.create({
        name,
        imageUrl,
        description
    });
};

module.exports = {
    getAllAccessory,
    createAccessory
}