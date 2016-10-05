'use strict'

const express = require('express');
const router = express.Router();

const authorModel = require('../model/author_query')
const bookModel = require('../model/book_query')


router.get('/', (req, res, next) =>{
  let authors = authorModel.getAllAuthors()
  let count = authorModel.countOfAuthors()
  Promise.all([authors, count])
    .then((authorInfo) => {
      res.render('authors/allauthors', {
        authors:authorInfo[0],
        authorCount: authorInfo[1]
      })
    })
    .catch((err) => {
      console.error('Error getting from database!')
      next(err)
    })
})

router.get('/view/:id', (req, res, next) => {
  let author = authorModel.getSingleAuthor(req.params.id)
  let books = bookModel.getBooksByAuthorID(req.params.id)
  Promise.all([author, books])
    .then((authorInfo) => {
      res.render('authors/singleauthor', {
        author:authorInfo[0],
        books:authorInfo[1]
      })
    })
    .catch((err) => {
      console.error('Error getting from database!')
      next(err)
    })
})

router.get('/add', (req, res, next) => {
  res.render('authors/addauthor')
})

router.post('/add', (req, res, next) => {
  authorModel.addAuthor(req.body)
    .then(() => {
      res.redirect('/authors')
    })
    .catch((err) => {
      console.error('Error inserting into database!')
      next(err)
    })
})

router.get('/edit/:id', (req, res, next) => {
  authorModel.findAuthor(req.params.id)
  .then((author) => {
    res.render('authors/editauthor', {author:author})
  })
  .catch((err) => {
    console.error('Error getting from database!')
    next(err)
  })
})

router.post('/edit/:id', (req, res, next) => {
  authorModel.editAuthor(req.params.id, req.body)
    .then(() => {
      res.redirect('/authors')
    })
    .catch((err) => {
      console.error('Error inserting into database!')
      next(err)
    })
})

router.get('/delete/:id', (req, res, next) => {
  authorModel.deleteAuthor(req.params.id)
  .then((author) => {
    res.redirect('/authors')
  })
  .catch((err) => {
    console.error('Error getting from database!')
    next(err)
  })
})

module.exports = router;
