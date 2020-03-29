const express = require("express");

/* Middleware validator */
const validator = require("./utils/validator");

const SessionController = require("./controllers/SessionController");
const OngController = require("./controllers/OngController");
const ProfileController = require("./controllers/ProfileController");
const IncidentController = require("./controllers/IncidentController");

const routes = express.Router();

/* login */
routes.post("/sessions", SessionController.create);

/* get a ong */
routes.get("/ongs", OngController.list);

/* create ong */
routes.post("/ongs", validator.validateCreateOng(), OngController.create);

/* get profile */
routes.get(
  "/profile",
  validator.validateProfileIndex(),
  ProfileController.index
);

/* list incidents / with paging */
routes.get(
  "/incidents",
  validator.validateIncidentList(),
  IncidentController.list
);

/* create a incident -> */
routes.post(
  "/incidents",
  validator.validateIncidentCreate(),
  IncidentController.create
);

/* delete incident-> */
routes.delete(
  "/incidents/:id",
  validator.validateIncidentDelete(),
  IncidentController.delete
);

module.exports = routes;
