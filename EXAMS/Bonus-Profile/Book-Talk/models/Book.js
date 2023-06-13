const { Schema, model, Types} = require('mongoose');

const bookShema = new Schema({
    title: { type: String, minlength: [2, 'Title must be at least 2 charecters long']},
    author: { type: String, minlength: [5, 'Author must be at least 5 charecters long']},
    imageUrl: { type: String, required: [true, 'ImageUrl is required'] },
    review: { type: String, minlength: [10, 'Review must be at least 10 charecters long']},
    genre: { type: String, minlength: [3, 'Gnere must be at least 3 charecters long']},
    stars: { type: Number, required: true, min: [1, 'Min stars 1'], max: [5, 'Max stars 5']},
    wishList: { type: [Types.ObjectId], ref:'User', default: []},
    owner: { type: String, required: true}
});

const Book = model('Book',bookShema);

module.exports = Book