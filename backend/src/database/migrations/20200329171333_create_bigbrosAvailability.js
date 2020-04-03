exports.up = function(knex) {
  return knex.schema.createTable("bigbrosAvailability", function(table) {
    table.increments("id");
    table.string("availabilityName");
    table.string("availabilityDescription");
    table.integer("availabilityQuantity");
    table.date("from");
    table.date("until");
    table.boolean("enable"); //?
    table.boolean("covered");
    table.string("coveredByVoluntaryId"); //que voluntario cubrio
    table.date("lastUpdated");
    table.string("bigbros_id").notNullable();
    table
      .foreign("bigbros_id")
      .references("id")
      .inTable("bigbros");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("bigbrosAvailability");
};
