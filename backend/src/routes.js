const express = require("express");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.list);
routes.post("/ongs", OngController.create);

routes.get("/profile", ProfileController.index);

routes.get("/incidents", IncidentController.list);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;

/*
 * Ruta / 'Recurso'
 *
 * HTTP Methods:
 * GET
 * POST
 * DELETE
 * PUT
 *
 */
/**
 * Tipos de Parametros
 * Query Param: ?param=value  (filtro, paginacion)
 * Route Param: /user/:id
 * Request Body:
 */

/**
 *  DB
 * SQL: MySQL, SQLite...
 * noSQL: MongoDb..
 */

/*
 * Driver: SELECT * ....
 * Query Builder: table('users').select('*')  : knext.js
 */
