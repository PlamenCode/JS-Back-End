const { model, Schema, Types } = require("mongoose");

const patternHTTP = /^https?:\/\/.+/i;

const cubeSchema = new Schema({
    name: { type: String, required: true, minlength: [5, 'Name required 5 charactes'] },
    description: { type: String, required: true, minlength: [20, 'Description long is minimum 20 charactes'] },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => patternHTTP.test(value),
            message: 'Image URL is not Valid'
        }
    },
    difficultyLevel: { type: Number, required: true },
    accessories: { type: [Types.ObjectId], default: [], ref: "Accessory" },
    owner: { type: Types.ObjectId, ref: 'User' }
});

const Cube = model("Cube", cubeSchema);

module.exports = Cube;
