'use strict'

const knex = require('./knex_config')

function getAllBooks (){
  return knex('book')
  .orderBy('id', 'asc')
}

function getSingleBook(bookID) {
  return knex('book')
    .where('id', bookID).first()
}

function getAuthorsByBookID(bookID) {
  return knex('book')
  .join('author_book','author_book.book_id', 'book.id')
  .join('author', 'author.id', 'author_book.author_id')
  .select(
    'author.id as authorID',
    'author.first_name as firstname',
    'author.last_name as lastname'
  )
  .where('book.id', bookID)
}

function addBook(bookInfo) {
  return knex('book')
    .insert(bookInfo)
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

module.exports = {
  getAllBooks: getAllBooks,
  getSingleBook: getSingleBook,
  getAuthorsByBookID: getAuthorsByBookID,
  addBook: addBook,
  editBook:editBook,
  deleteBook: deleteBook
}
