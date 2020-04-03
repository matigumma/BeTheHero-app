exports.up = function(knex) {
  return knex.schema.createTable("bigbros", function(table) {
    table.increments("id").primary();
    table.boolean("enabled"); //
    table.boolean("verified"); //
    table.string("businessLocal"); //empresa nombre
    table.string("website"); //empresa website
    table.integer("rate"); //acumulado de rate de otros
    table.date("lastUpdate");
    table.string("user_id").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("bigbros");
};
