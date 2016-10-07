'use strict'

const knex = require('./knex_config')

function getAllBooks (){
  return knex('book')
  .orderBy('id', 'asc')
}

function countOfBooks(){
  return knex('book')
  .count('id')
  .first()
}

function getSingleBook(bookID) {
  return knex('book')
    .where('id', bookID).first()
}

function editBook(bookID, bookInfo) {
  return knex('book')
    .where('id', bookID)
    .update({
      'title': bookInfo.title,
      'genre': bookInfo.genre,
      'cover_url': bookInfo.cover_url,
      'description': bookInfo.description
    })
}

function deleteBook(bookID) {
  return knex('book')
    .where('id', bookID)
    .del()
}

function getBooksByAuthorID(authID) {
  return knex('book')
  .join('author_book','author_book.book_id', 'book.id')
  .join('author', 'author.id', 'author_book.author_id')
  .select(
    'book.id as bookID',
    'book.title as bookTitle'
  )
  .where('author.id', authID)
}

module.exports = {
  getAllBooks: getAllBooks,
  countOfBooks: countOfBooks,
  getBooksByAuthorID: getBooksByAuthorID,
  getSingleBook: getSingleBook,
  editBook: editBook,
  deleteBook: deleteBook
}
