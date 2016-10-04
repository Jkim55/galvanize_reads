exports.up = function(knex, Promise) {
  return knex.schema.createTable('book', function(table) {
    table.increments();
    table.string('title');
    table.string('genre');
    table.text('description');
    table.string('cover_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book');
};
