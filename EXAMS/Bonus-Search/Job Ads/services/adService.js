const Ad = require("../models/Ad");


async function getAllAdds(){
    return await Ad.find({}).lean();
};

async function getFirstAdds(){
    const adds = await Ad.find({}).lean();
    return adds.slice(0, 3);
};

async function findAdById(adId){
    return await Ad.findById(adId).lean();
};

async function createAd(adData, authorId){
    const ad = {
        headline: adData.headline,
        location: adData.location,
        companyName: adData.companyName,
        companyDescription: adData.companyDescription,
        author: authorId
    };
    return await Ad.create(ad);
}

async function updateAd(id, adData){
    const ad = await Ad.findById(id);

    ad.headline = adData.headline;
    ad.location = adData.location;
    ad.companyName = adData.companyName;
    ad.companyDescription = adData.companyDescription;

    return ad.save();
};

async function deleteAdById(adId, userId){
    const ad = await Ad.findById(adId).lean();
    if(ad.author.toString() == userId.toString()){
        return await Ad.findByIdAndDelete(adId);
    }
};

async function apply(adId, userId){
    const ad = await Ad.findById(adId);
    ad.userApplies.push(userId);
    return ad.save();
};

module.exports = {
    getAllAdds,
    getFirstAdds,
    findAdById,
    updateAd,
    deleteAdById,
    createAd,
    apply
}