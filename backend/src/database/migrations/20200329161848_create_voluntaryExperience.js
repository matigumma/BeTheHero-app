exports.up = function(knex) {
  //where, direction, contactName, date, experienceRate, friends:[{name, whatsapp, mail}]
  return knex.schema.createTable("voluntaryExperience", function(table) {
    table.increments("id").primary();
    table.string("placeName").notNullable();
    table.string("city").notNullable();
    table.string("direction").notNullable();
    table.string("contactName").notNullable();
    table.string("contactMail");
    table.string("contactWhatsapp");
    table.string("experienceRate");
    table.string("experienceDescription");
    table.date("from").notNullable();
    table.date("until").notNullable();
    table.date("lastUpdate").notNullable();
    table.string("voluntary_id").notNullable();
    table
      .foreign("voluntary_id")
      .references("id")
      .inTable("voluntary");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("voluntaryExperience");
};
