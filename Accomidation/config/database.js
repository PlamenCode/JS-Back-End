const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/sleep-over';

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected. :)');
    } catch(err){
        console.error('Error occured on database...')
        console.error(err.message);
        process.exit(1);
    }
}