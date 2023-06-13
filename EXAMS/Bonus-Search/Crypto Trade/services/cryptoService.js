const Crypto= require('../models/Crypto')

async function getAllCryptos(){
    return await Crypto.find({}).lean();
};

async function createCrypto(cryptoData){
    return await Crypto.create(cryptoData);
};

async function getCryptoById(id){
    return await Crypto.findById(id).lean();
};

async function updateCrypto(id, cryptoData){
    const crypto = await Crypto.findById(id);

    crypto.name = cryptoData.name;
    crypto.imageUrl = cryptoData.imageUrl;
    crypto.price = cryptoData.price;
    crypto.description = cryptoData.description;
    crypto.genre = cryptoData.genre;
    crypto.platform = cryptoData.platform;

    crypto.save();
};

async function deleteCrypto(id){
    return await Crypto.findByIdAndDelete(id);
};

async function buyCrypto(userId, cryptoId){
    const crypto = await Crypto.findById(cryptoId);
    if(crypto.bougthBy.some(x => x.toString() == userId.toString())){
        return;
    };
    crypto.bougthBy.push(userId);
    return crypto.save();
}

async function filteredCoins(payment, text){
    const allCoins = await Crypto.find().lean();
    let filteredCoins;

    filteredCoins = allCoins.filter(c => c.payment == payment);
    if(text){
        filteredCoins = filteredCoins.filter(c => c.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
    };

    return filteredCoins;
}



module.exports = {
    getAllCryptos,
    createCrypto,
    getCryptoById,
    updateCrypto,
    deleteCrypto,
    buyCrypto,
    filteredCoins
}
