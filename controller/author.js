'use strict'

const express = require('express');
const router = express.Router();

const authorModel = require('../model/author_query')
const bookModel = require('../model/book_query')


router.get('/', (req, res, next) =>{
  authorModel.getAllAuthors()
    .then((author) => {
      res.render('authors/allauthors', {author:author})
    })
})

router.get('/view/:id', (req, res, next) => {
  let author = authorModel.getSingleAuthor(req.params.id)
  let books = bookModel.getBooksByAuthorID(req.params.id)
    // .then((data) =>{
    //   console.log(data);
    // })
  Promise.all([author, books])
    .then((authorInfo) => {
      res.render('authors/singleauthor', {
        author:authorInfo[0],
        books:authorInfo[1]
      })
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
})

router.get('/edit/:id', (req, res, next) => {
  authorModel.findAuthor(req.params.id)
  .then((author) => {
    res.render('authors/editauthor', {author:author})
  })
})

router.post('/edit/:id', (req, res, next) => {
  authorModel.editAuthor(req.params.id, req.body)
    .then(() => {
      res.redirect('/authors')
    })
})

router.get('/delete/:id', (req, res, next) => {
  authorModel.deleteAuthor(req.params.id)
  .then((author) => {
    res.redirect('/authors')
  })
})

module.exports = router;
