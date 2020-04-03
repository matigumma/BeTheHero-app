exports.up = function(knex) {
  return knex.schema.createTable("bigbrosFeedback", function(table) {
    table.increments("id");
    table.string("feedback").notNullable();
    table.string("rate").notNullable();
    table.string("byWho").notNullable();
    table.date("lastUpdate").notNullable();
    table.string("bigbros_id").notNullable();
    table
      .foreign("bigbros_id")
      .references("id")
      .inTable("bigbros");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("bigbrosFeedback");
};
