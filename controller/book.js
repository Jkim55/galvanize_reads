'use strict'

const express = require('express');
const router = express.Router();

const util = require ('util') // to view depth nested promise (ln 27)

const bookModel = require('../model/book_query')
const authorModel = require('../model/author_query')

// show all books
router.get('/', (req, res, next) => {
  let books =   bookModel.getAllBooks()
    .then((book) => {
      let bookwauthor = book.map((book) => {
        return authorModel.getAuthorsByBookID(book.id)
          .then((author)=>{
              book.authorlist = author;
            return book
          })
      })
      return Promise.all(bookwauthor)
    })
  let count = bookModel.countOfBooks()
  Promise.all([books,count])
  .then((bookData)=>{
    // console.log(util.inspect(book, {depth:5})) // see more details on nested objs
    res.render('book/allbooks', {
      books: bookData[0],
      bookCount: bookData[1]
    });
  })
  .catch((err) => {
    console.error('Error getting from database!')
    next(err)
  })
})


// view a single book
router.get('/view/:id', function(req, res, next) {
  let book = bookModel.getSingleBook(req.params.id)
  let authors = authorModel.getAuthorsByBookID(req.params.id)
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
  authorModel.getAllAuthorsTruncated()
    .then((authors) => {
      res.render('book/addbooks', {authors: authors});
    })
    .catch((err) => {
      console.error('Error getting from database!')
      next(err)
    })
});

router.post('/add', function(req, res, next) {
  console.log(req.body)
  // let authors = $("#submit").on('click',function () {
  //   let arrHTML = []
  //   $(".singleAuthor").each(() => {
  //     arrHTML.push($( this ).html())
  //   })
  // })

  let book = bookModel.addBook(req.body)
  // let author = authorModel.addauthor()
  // Promises.all([book, author]) // add res.render obj
  .then (() => {
    res.redirect('/books')
  })
  .catch((err) => {
    console.error('Error inserting into database!')
    next(err)
  })
});

// add existing authors into render page
router.get('/edit/:id', function (req, res, next) {
  let book = bookModel.getSingleBook (req.params.id)
  let bookAuthors = authorModel.getAuthorsByBookID(req.params.id)
  let allAuthors = authorModel.getAllAuthorsTruncated()
  Promise.all([book, bookAuthors, allAuthors])
  .then ((bookInfo) => {
    console.log('bookauthors:', bookInfo[1]);
    console.log('all authors:', bookInfo[2]);
    res.render('book/editbooks', {
      book:bookInfo[0],
      existingAuthors: bookInfo[1],
      allAuthors: bookInfo[2]
    });
  })
  .catch((err) => {
    console.error('Error getting from database!')
    next(err)
  })
});

router.post('/edit/:id', function(req, res, next) {
  bookModel.editBook(req.params.id, req.body)
  .then (() => {
    res.redirect('/books')
  })
  .catch((err) => {
    console.error('Error inserting into from database!')
    next(err)
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
