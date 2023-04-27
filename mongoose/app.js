const mongoose = require('mongoose');
const Person = require('./models/Person');

const connectionString = 'mongodb://127.0.0.1:27017/databaseTest';
start();

async function start(){
    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Database connected [x]');

    // Creating element in database --- await Person.create({name: 'rara', age: 23});
    // Show DB - await Person.find({});
    // Filter method 1 -- await Person.find({ age: { $gte:20, $lte:30 } }); // >= 20 && 30 <=
    // Filter method 2 --- below (.sort if 1-accending, if -1-decendig );  
    // const result = await Person
    // .find({})
    // .where('age').gte(16).lte(23).sort({age: -1});
    // console.log(result);

    const result = await Person
    .find({})
    .where('age').gte(16).lte(23).sort({age: -1});
    console.log(result);





 await mongoose.disconnect();
}
