const mongoose = require('mongoose');

// TODO change database name as needed
const connectionString = 'mongodb://127.0.0.1:27017/ScafoldBase';

module.exports = async (app) => {
    try{
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected :)');
    } catch (err){
        console.error(err.message);
        process.exit(1);
    }

}