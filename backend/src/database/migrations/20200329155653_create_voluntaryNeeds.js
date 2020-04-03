exports.up = function(knex) {
  return knex.schema.createTable("voluntaryNeeds", function(table) {
    table.increments("id");
    table.boolean("criticalStatus").notNullable(); //urgente
    table.string("description");
    table.boolean("needRoof").notNullable();
    table.boolean("needFood").notNullable();
    table.boolean("needTransport").notNullable();
    table.boolean("needCleanliness").notNullable();
    table.boolean("needHeal").notNullable();
    table.boolean("needFriendship").notNullable();
    table.string("needOther"); //[{other, description}]
    table.date("lastUpdate").notNullable();
    table.string("voluntary_id").notNullable();
    table
      .foreign("voluntary_id")
      .references("id")
      .inTable("voluntary");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("voluntaryNeeds");
};
