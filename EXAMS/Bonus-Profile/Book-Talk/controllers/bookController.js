const bookController = require("express").Router();

const { validationResult, body } = require("express-validator");
const { getBookById, updateBook, deleteBook, addToWishList } = require("../services/bookService");
const { parseError } = require("../utils/parser");

bookController.get("/edit/:id", async (req, res) => {
  const book = await getBookById(req.params.id);
  res.render("edit", {
    title: "Edit Book",
    user: req.user,
    body: book,
    id: req.params.id
  });
});

bookController.post("/edit/:id",
  body("imageUrl").isURL().withMessage("Invalid Url"),
  async (req, res) => {
    try {
        const result = validationResult(req);
        if(result.errors.length > 0) { throw result.errors };

        if(req.body.title == '' || req.body.author == '' || req.body.imageUrl == '' || 
           req.body.review == '' || req.body.genre == '' || req.body.stars == ''){
            throw new Error('All fields are required');
        };
        const bookData = {
            title: req.body.title,
            author: req.body.author,
            imageUrl: req.body.imageUrl,
            review: req.body.review,
            genre: req.body.genre,
            stars: Number(req.body.stars),
            owner: req.user._id
        };

        await updateBook(req.params.id, bookData);  
        res.redirect(`/details/${req.params.id}`); 
    } catch (err) {
        res.render('edit', {
            title: 'Edit Page',
            user: req.user,
            body: {
                title: req.body.title,
                author: req.body.author,
                imageUrl: req.body.imageUrl,
                review: req.body.review,
                genre: req.body.genre,
                stars: Number(req.body.stars),
            },
            id: req.params.id,
            errors: parseError(err)
        })
    }
  }
);

bookController.get('/delete/:id', async (req, res) => {
    const book = await getBookById(req.params.id);
    if(book.owner.toString() == req.user._id.toString()){
        await deleteBook(req.params.id);
        res.redirect('/catalog');
    } else{
        return; 
    }
});


bookController.get('/wish/:id', async (req, res) => {
    const book = await getBookById(req.params.id);
    const bookWished = book.wishList;

    try {
        if(bookWished.some(x => x.toString() == userId.toString())){
            console.log('booked');
            throw new Error('You are already booked')
        };
        await addToWishList(req.user._id, req.params.id);
        res.redirect(`/details/${req.params.id}`);
    } catch (err) {
        res.render('details', {
            title: 'Details',
            user: req.user,
            book,
            hasAdded: true,
            errors: parseError(err)
        })
    }
})

module.exports = bookController;
