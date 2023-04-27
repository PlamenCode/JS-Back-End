const mongoose = require('mongoose');

const serviceIP = 'mongodb://192.168.88.50:27017/cubicleBD'

async function db() {

}

module.exports = async (app) => {
    try {
        await mongoose.connect(serviceIP, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};