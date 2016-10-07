'use strict'

const knex = require('./knex_config')

function getAllAuthors (){
  return knex('author')
  .orderBy('first_name', 'asc')
}

function getAllAuthorsTruncated (){
  return knex('author')
  .orderBy('first_name', 'asc')
  .select(
    'author.id as authorID',
    'author.first_name as firstname',
    'author.last_name as lastname'
  )
}

function countOfAuthors(){
  return knex('author')
  .count('id')
  .first()
}

function getAuthorsByBookID(bookID) {
  return knex('author')
    .join('author_book', 'author_book.author_id', 'author.id')
    .join('book', 'book.id', 'author_book.book_id')
    .select(
      'author.id as authorID',
      'author.first_name as firstname',
      'author.last_name as lastname'
    )
    .where('book.id', bookID)
}

function getSingleAuthor(AuthID){
  return knex('author')
  .where('id', AuthID).first()
}

function addAuthor(authInfo){
  return knex('author')
    .insert(authInfo)
}

function findAuthor(authID){
  return knex('author')
    .where ('id', authID)
    .first()
}

function editAuthor(authID, authInfo){
  return knex('author')
    .where('id', authID)
    .update({
      'first_name': authInfo.first_name,
      'last_name': authInfo.last_name,
      'portrait_url': authInfo.cover_url,
      'bio': authInfo.bio
    })
}

function deleteAuthor(authorID) {
  return knex('author')
    .where('id', authorID)
    .del()
}

module.exports = {
  getAllAuthors: getAllAuthors,
  getAllAuthorsTruncated: getAllAuthorsTruncated,
  countOfAuthors: countOfAuthors,
  getAuthorsByBookID: getAuthorsByBookID,
  getSingleAuthor: getSingleAuthor,
  deleteAuthor: deleteAuthor,
  addAuthor: addAuthor,
  findAuthor: findAuthor,
  editAuthor: editAuthor
}
