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
  let book = bookModel.getSingleBook(req.params.id)
  let authors = bookModel.getAuthorsByBookID(req.params.id)
  Promise.all([book,authors])
  .then((bookInfo) => {
    res.render('book/singlebook', {
      book: bookInfo[0],
      authors: bookInfo[1]
    });
  })
  .catch((err) => {
    console.error('Error getting from database!')
    next(err)
  })
});

router.get('/add', function(req, res, next) {
    res.render('book/addbooks');
});

router.post('/add', function(req, res, next) {
  bookModel.addBook(req.body)
  .then (() => {
    res.redirect('/books')
  })
});

router.get('/edit/:id', function (req, res, next) {
  bookModel.getSingleBook (req.params.id)
  .then ((data) => {
    res.render('book/editbooks', {data:data});
  })
});

router.post('/edit/:id', function(req, res, next) {
  bookModel.editBook(req.params.id, req.body)
  .then (() => {
    res.redirect('/books')
  })
});

router.get('/delete/:id', function(req, res, next) {
  bookModel.deleteBook(req.params.id)
  .then(() => {
    res.redirect('/books')
  })
  .catch((err) => {
    console.error('Error caught in deleting post from DB')
    next(err)
  })
});

module.exports = router;
