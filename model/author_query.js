'use strict'

const knex = require('./knex_config')

function getAllAuthors (){
  return knex('author')
  .orderBy('id', 'asc')
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
  getSingleAuthor: getSingleAuthor,
  deleteAuthor: deleteAuthor,
  addAuthor: addAuthor,
  findAuthor: findAuthor,
  editAuthor: editAuthor
}
