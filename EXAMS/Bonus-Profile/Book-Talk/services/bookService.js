const Book = require("../models/Book");

async function getAllBooks(){
    return books = await Book.find({}).lean();
};

async function createBook(bookData){
    const book = {
        title: bookData.title,
        author: bookData.author,
        imageUrl: bookData.imageUrl,
        review: bookData.review,
        genre: bookData.genre,
        stars: bookData.stars,
        owner: bookData.owner
    };
    return await Book.create(book);
};

async function getBookById(bookId){
    return Book.findById(bookId).lean();
};

async function updateBook(bookId, bookData){
    const book = await Book.findById(bookId);

    book.author = bookData.author;
    book.imageUrl = bookData.imageUrl;
    book.review = bookData.review;
    book.genre = bookData.genre;
    book.stars = Number(bookData.stars);
    book.owner = bookData.owner;

    return book.save();
};

async function deleteBook(bookId){
    return Book.findByIdAndDelete(bookId);
};

async function addToWishList(userId, bookId){
    const book = await Book.findById(bookId);
    book.wishList.push(userId);
    return book.save();
}

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    addToWishList
}