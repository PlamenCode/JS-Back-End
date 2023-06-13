const Auction = require("../models/Auction");


async function getAll(){
    return await Auction.find({}).lean();
};

async function createAuction(cryptoData){
    return await Auction.create(cryptoData);
};

async function getOne(id){
    return await Auction.findById(id).lean();
};

async function updateAuction(id, auctionData){
    const auction = await Auction.findById(id);

    auction.title = auctionData.title;
    auction.description = auctionData.description;
    auction.category = auctionData.category;
    auction.imageUrl = auctionData.imageUrl;
    auction.price = Number(auctionData.price);

    return auction.save();
};

async function deleteAuction(id){
    return await Auction.findByIdAndDelete(id);
};

async function bidding(auctionId, bidderId, amount){
    const auction = await Auction.findById(auctionId);
    auction.bidder = bidderId;
    auction.price = Number(amount);

    return auction.save();
}

module.exports = {
    getAll,
    getOne,
    updateAuction,
    deleteAuction,
    createAuction,
    bidding
}


