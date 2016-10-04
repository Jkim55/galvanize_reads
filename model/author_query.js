'use strict'

const knex = require('./knex_config')

function getAllAuthors (){
  return knex('author')
  .orderBy('id', 'asc')
}


module.exports = {
  getAllAuthors: getAllAuthors
}
