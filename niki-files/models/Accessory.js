const { model, Schema, Types } = require("mongoose");

const patternHTTP = /^https?:\/\/.+/i;

const accessorySchema = new Schema({
    name: { type: String, required: true, minlength: [5, 'Name required 5 charactes'] },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => patternHTTP.test(value),
            message: 'Image URL is not Valid'
        }
    },
    description: { type: String, required: true, minlength: [20, 'Description long is minimum 20 charactes'] },
    cubes: { type: [Types.ObjectId], default: [], ref: "Cube" }
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;