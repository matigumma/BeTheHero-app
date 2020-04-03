const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const {
      contactName,
      contactMail,
      contactWhatsapp,
      experiencey_id
    } = req.body;

    const lastUpdate = new Date().getUTCDate();

    try {
      await connection("voluntaryExperienceFriends").insert({
        contactName,
        contactMail,
        contactWhatsapp,
        lastUpdate,
        experience_id
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({
        error: "Creating experience Friend on database fail, try again."
      });
    }
  },

  async update(req, res) {
    const { exp_id } = req.query.id;
    const data = req.body;
    const lastUpdate = new Date().getUTCDate();
    data.lastUpdate = lastUpdate;

    try {
      await connection("voluntaryExperienceFriends")
        .where({
          experience_id: exp_id
        })
        .update(data);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error saving on db..." });
    }
  },

  async delete(req, res) {
    const { expFri_id } = req.params.id;

    try {
      await connection("voluntaryExperienceFriends")
        .where("id", expFri_id)
        .delete();

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error saving on db..." });
    }
  }
};
