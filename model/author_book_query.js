'use strict'

const knex = require('./knex_config')

function addBookWithAuthor(){

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
  addBook: addBookWithAuthor,
}
