exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', function(table) {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.text('bio');
    table.string('portrait_url');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('author')
}
