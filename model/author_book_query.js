'use strict'

const knex = require('./knex_config')

function addNewBook(title, genre, cover_url, description){
  return knex('book')
    .insert({
      'title': title,
      'genre': genre,
      'cover_url': cover_url,
      'description': description
    })
    .returning('id')
}

// get authorID
function addNewBookAuthor(bookID, authorID){
  return knex('author_book')
    .insert(bookID, authorID)
}


// knex.insert({
//   first_name: firstName,
//   last_name: lastName,
//   email: email,
//   phone_number: phoneNumber
// })
// .returning('id')
// .into('person')
// .then(function (id) {
//   // use id here
// });

module.exports = {
  addNewBook: addNewBook,
  addNewBookAuthor: addNewBookAuthor
}
