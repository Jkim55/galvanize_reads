'use strict'
const util = require ('util')


const express = require('express');
const router = express.Router();

const bookModel = require('../model/book_query')

// show all books
router.get('/', (req, res, next) => {
  bookModel.getAllBooks()
  .then((book) => {
    let bookwauthor = book.map((book) => {  // this is an array of
      return bookModel.getAuthorsByBookID(book.id)
        .then((author)=>{
            book.authorlist = author;
          return book
        })
    })
    return Promise.all(bookwauthor)
  })
  .then((book)=>{
    // console.log(util.inspect(book, {depth:5})) // see more details on nested objs
    res.render('book/allbooks', {book:book});
  })
  .catch((err) => {
    console.error('Error getting from database!')
    next(err)
  })
})

// view a single book
router.get('/view/:id', function(req, res, next) {
  bookModel.getSingleBook(req.params.id)
  .then((book) => {
    console.log(book);
    res.render('book/singlebook', {
      book: book
    });
  })
  .catch((err) => {
    console.error('Error getting from database!')
    next(err)
  })
});

router.get('/add/new', function(req, res, next) {
    res.render('book/addbooks');
});


module.exports = router;
