exports.up = function(knex) {
  return knex.schema.createTable("voluntary", function(table) {
    table.increments("id").primary();
    table.boolean("valid").notNullable(); //vigencia
    table.date("created").notNullable();
    table.date("lastUpdate").notNullable();

    table.string("docType");
    table.string("doc");
    table.string("nationality").notNullable();

    table.string("originAddress");
    table.string("originContactName");
    table.string("originContactMail");
    table.string("originContactPhone");

    table.string("actualCity").notNullable();
    table.string("actualPlaceName");
    table.string("actualPlaceDirection");
    table.string("actualPlaceContactName");
    table.string("actualPlaceContactEmail");
    table.string("actualPlaceContactPhone");

    table
      .string("user_id")
      .unique()
      .notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("voluntary");
};
