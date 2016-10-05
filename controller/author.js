'use strict'

const express = require('express');
const router = express.Router();

const authorModel = require('../model/author_query')

router.get('/', (req, res, next) =>{
  authorModel.getAllAuthors()
    .then((author) => {
      res.render('authors/allauthors', {author:author})
    })
})

router.get('/view/:id', (req, res, next) => {
  authorModel.getSingleAuthor(req.params.id)
    .then((author) => {
      res.render('authors/singleauthor', {author:author})
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
    console.log(author);
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
