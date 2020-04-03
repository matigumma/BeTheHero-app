exports.up = function(knex) {
  return knex.schema.createTable("healthStatus", function(table) {
    table.increments("id");

    table.boolean("healthDisability").notNullable(); //discapacidad alguna?
    table.string("healthDisabilityDescription");

    //recent last 15 days
    table.string("healthRecentStatus").notNullable(); //"healthy/sick/serious"
    table.boolean("healthRecentStatusFiber");
    table.boolean("healthRecentStatusCough");
    table.boolean("healthRecentStatusShortnessBreath");
    table.string("healthRecentStatusDescription");

    //actual health
    table.string("healthStatus").notNullable(); //"healthy/sick/notSure"
    table.boolean("healthStatusFiber");
    table.boolean("healthStatusCough");
    table.boolean("healthStatusShortnessBreath");
    table.string("healthStatusDescription");

    table.string("healthStatusFeeling");

    table.string("healthStatusSupport"); //anybody to trust or anybody to talk
    //habits
    table.string("healthHabits"); //[{habit:"any", show:true }]
    //date
    table.date("updated").notNullable();

    table.string("user_id").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("healthStatus");
};
