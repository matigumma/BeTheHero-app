exports.up = function(knex) {
  //[{cook, designer, photo, bartender, reception, guide, showman, dj, etc, etc}]
  return knex.schema.createTable("voluntaryAbilities", function(table) {
    table.increments("id");
    table.string("abilitie");
    table.string("abilitieDescription");
    table.string("abilitieRate");
    table.date("lastUpdate").notNullable();
    table.string("voluntary_id").notNullable();
    table
      .foreign("voluntary_id")
      .references("id")
      .inTable("voluntary");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("voluntaryAbilities");
};
