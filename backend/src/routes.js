const express = require("express");

/* Middleware validator */
const validator = require("./utils/validator");

const SessionController = require("./controllers/SessionController");
const UsersController = require("./controllers/UsersController");
const BigbroController = require("./controllers/BigbroController");
const BigbroFeedbackController = require("./controllers/BigbroFeedbackController");
const VoluntaryController = require("./controllers/VoluntaryController");
const VoluntaryNeedsController = require("./controllers/VoluntaryNeedsController");
const BigbroAvailabilityController = require("./controllers/BigbroAvailabilityController");
const VoluntaryAbilitiesController = require("./controllers/VoluntaryAbilitiesController");
const VoluntaryExperienceController = require("./controllers/VoluntaryExperienceController");
const VoluntaryExperienceFriendsController = require("./controllers/VoluntaryExperienceFriendsController");

const routes = express.Router();

/* register //register a new user with star info on db*/
routes.post("/register", SessionController.create);

/* login //get user info from db where uuid from firebase match */
routes.post("/session", SessionController.login);

/* listusers //list all enabled users */
routes.get("/listUsers", UsersController.list);
/* updateuser //update a single user options */
routes.put("/updateUser", UsersController.update);
// delete user will be just enabled=false user... //solo el usuario propietario puede borrar la cuenta y en un futuro tambien podria volver a habilitarda con update...
routes.put("/deleteUser", UsersController.delete);

/* create new voluntary //create a voluntary profile without needs on db*/
routes.post("/createVoluntary", VoluntaryController.create);
/* get volunteers //get list of users that have a voluntary profile enable*/
routes.get("/listVolunteers", VoluntaryController.list);
/* update voluntary //query ?id=voluntaryId  headers authid */
routes.put("/updateVoluntary", VoluntaryController.update);
/* delete voluntary // will just disable state /  ?id=voluntaryId  headers authid  */
routes.put("/deleteVoluntary", VoluntaryController.delete);

/* create new voluntaryNeeds for an existing voluntary_id */
routes.post("/createVoluntaryNeeds", VoluntaryNeedsController.create);
/* update voluntaryNeeds //query ?id=voluntaryId  headers authid */
routes.post("/updateVoluntaryNeeds", VoluntaryNeedsController.update);

/* create new voluntaryAbilitie for an existing voluntary_id */
routes.post("/createVoluntaryAbilities", VoluntaryAbilitiesController.create);
/* list a voluntary Abilities for an existing voluntary_id */
routes.get("/getVoluntaryAbilities", VoluntaryAbilitiesController.list);
/* update voluntaryAbilitie //query ?id=voluntaryId  headers authid */
routes.put("/updateVoluntaryAbilities", VoluntaryAbilitiesController.update);

/* create new voluntaryExperience for an existing voluntary_id */
routes.post("/createVoluntaryExperience", VoluntaryExperienceController.create);
/* update voluntaryExperience //query ?id=voluntaryId  headers authid */
routes.put("/updateVoluntaryExperience", VoluntaryExperienceController.update);
/* delete voluntaryExperience //routeParams/voluntaryId  */
routes.delete(
  "/deleteVoluntaryExperience/:id",
  VoluntaryExperienceController.delete
);

/* create new voluntaryExperienceFriends for an existing voluntary_id */
routes.post(
  "/createVoluntaryExperienceFriends",
  VoluntaryExperienceFriendsController.create
);
/* update voluntaryExperienceFriends //query ?id=experienceId  headers authid */
routes.put(
  "/updateVoluntaryExperienceFriends",
  VoluntaryExperienceFriendsController.update
);
/* delete voluntaryExperienceFriends //routeParams/experienceId  */
routes.delete(
  "/deleteVoluntaryExperienceFriends/:id",
  VoluntaryExperienceFriendsController.delete
);

/* BIGBROS */

/* create new bigbro //create a bigbro profile without availabilities on db*/
routes.post("/createBigbro", BigbroController.create);
/* get volunteers //get list of users that have a Bigbro profile enable true*/
routes.get("/listBigbros", BigbroController.list);
/* update Bigbro //query ?id=BigbroId  headers authid */
routes.put("/updateBigbro", BigbroController.update);
/* delete Bigbro // will just disable state /  ?id=BigbroId  headers authid  */
routes.put("/deleteBigbro", BigbroController.delete);

/* create new BigbroAvailability for an existing bigbro_id */
routes.post("/createBigbroAvailability", BigbroAvailabilityController.create);
/* update BigbroAvailability //query ?id=bigbroId  headers authid */
routes.put("/updateBigbroAvailability", BigbroAvailabilityController.update);

/* create new BigbroFeedback for an existing bigbro_id */
routes.post("/createBigbroFeedback", BigbroFeedbackController.create);
/* update BigbroFeedback //query ?id=bigbroId  headers authid */
routes.put("/updateBigbroFeedback", BigbroFeedbackController.update);
/* delete BigbroFeedback //query ?id=bigbroId  headers authid */
routes.delete("/deleteBigbroFeedback", BigbroFeedbackController.delete);

module.exports = routes;
