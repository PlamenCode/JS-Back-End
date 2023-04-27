const { Schema, model } = require('mongoose');

const personShema = new Schema({
    name: String,
    age: Number,
});

personShema.methods.saysHi = function(){
    return `${this.name} says hi!!!`
}

const Perosn = model('Person', personShema);

module.exports = Perosn;