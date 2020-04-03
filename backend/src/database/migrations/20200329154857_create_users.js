exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("surname").notNullable();
    table.string("nickname");
    table.integer("age").notNullable();
    table.string("sexualIdentity");
    table.string("avatar");
    table
      .string("email")
      .unique()
      .notNullable();
    table.string("whatsapp").notNullable();
    table.string("facebookId");
    table.string("city");
    table.string("direction");
    table.string("lat");
    table.string("lng");
    table.boolean("enabled").notNullable();
    table.date("creationDate").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
