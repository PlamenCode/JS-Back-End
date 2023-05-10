const { getAllBooks } = require("./bookService");

async function getAllWishedBooks(userId){
    const books = await getAllBooks();
    const wishedBooks = [];
    for (const book of books) {
        if(book.wishList.some(id => id.toString() == userId.toString())){
            wishedBooks.push(book);
        }
    }
    return wishedBooks;
};

module.exports = {
    getAllWishedBooks,
};