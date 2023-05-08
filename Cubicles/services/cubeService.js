const Accessory = require("../models/Accessory");
const Cube = require("../models/Cube");


async function getAll() {
    let result = await Cube.find({}).lean();
    console.log(result);
    return result;
}

async function getById(id) {
    const result = await Cube.findById(id).lean();
    return result;
}

async function createCube(cubeData) {
    return await Cube.create(cubeData);
};

async function addAccessoryForCubes(cubeId, accessoryId) {
    const cubes = await Cube.findById(cubeId).populate('accessories');
    const accessory = await Accessory.findById(accessoryId.accessory).populate('cubes');

    cubes.accessories.push(accessoryId.accessory)
    accessory.cubes.push(cubeId);

    await cubes.save();
    await accessory.save()
}

async function editCube(id, cubeInfo) {
    const existing = await Cube.findById(id);

    existing.name = cubeInfo.name;
    existing.description = cubeInfo.description;
    existing.imageUrl = cubeInfo.imageUrl;
    existing.difficultyLevel = cubeInfo.difficultyLevel;

    await existing.save();
}

async function deleteById(id) {
    const result = await Cube.findByIdAndRemove(id);
    return result;
}

module.exports = {
    getAll,
    getById,
    addAccessoryForCubes,
    createCube,
    editCube,
    deleteById
}