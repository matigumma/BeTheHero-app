exports.up = function(knex) {
  return knex.schema.createTable("voluntaryExperienceFriends", function(table) {
    table.increments("id");
    table.string("contactName").notNullable();
    table.string("contactMail");
    table.string("contactWhatsapp");
    table.date("lastUpdate").notNullable();
    table.string("experience_id").notNullable();
    table
      .foreign("experience_id")
      .references("id")
      .inTable("voluntaryExperience");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("voluntaryExperienceFriends");
};
