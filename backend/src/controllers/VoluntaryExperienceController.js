const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const {
      placeName,
      city,
      direction,
      contactName,
      contactMail,
      contactWhatsapp,
      experienceRate,
      experienceDescription,
      from,
      until,
      voluntary_id
    } = req.body;

    const lastUpdate = new Date().getUTCDate();

    try {
      await connection("voluntaryExperience").insert({
        placeName,
        city,
        direction,
        contactName,
        contactMail,
        contactWhatsapp,
        experienceRate,
        experienceDescription,
        from,
        until,
        lastUpdate,
        voluntary_id
      });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Creating experience on database fail, try again." });
    }
  },

  async update(req, res) {
    const { vol_id } = req.query.id;
    const data = req.body;
    const lastUpdate = new Date().getUTCDate();
    data.lastUpdate = lastUpdate;

    try {
      await connection("voluntaryExperience")
        .where({
          voluntary_id: vol_id
        })
        .update(data);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error saving on db..." });
    }
  },

  async delete(req, res) {
    const { exp_id } = req.params.id;
    /*     const auth_id = req.headers.authid; */
    try {
      /*       const experienceUser = await connection("voluntaryExperience")
        .where("id", exp_id)
        .leftJoin(
          "voluntary",
          "voluntary.id",
          "=",
          "voluntaryExperience.voluntary_id"
        )
        .select("user_id")
        .first();

      if (experienceUser.user_id !== auth_id) {
        return res.status(401).json({ error: "Operation not permitted." });
      } */

      await connection("voluntaryExperience")
        .where("id", exp_id)
        .delete();

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error saving on db..." });
    }
  }
};
