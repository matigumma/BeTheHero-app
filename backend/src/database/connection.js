const knex = require("knex");
const config = require("../../knexfile");

const configuracionEnv =
  process.env.NODE_ENV === "test" ? config.test : config.development;

const connection = knex(configuracionEnv);

module.exports = connection;
