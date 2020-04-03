const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    const { vol_id } = req.query.id;
    try {
      const abilities = await connection("voluntaryAbilities")
        .where({
          voluntary_id: vol_id
        })
        .select("*");

      return res.status(200).json(abilities);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error getting data on db..." });
    }
  },

  async create(req, res) {
    const {
      abilitie,
      abilitieDescription,
      abilitieRate,
      voluntary_id
    } = req.body;

    const lastUpdate = new Date().getUTCDate();

    try {
      await connection("voluntaryAbilities").insert({
        abilitie,
        abilitieDescription,
        abilitieRate,
        lastUpdate,
        voluntary_id
      });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Creating abilitie on database fail, try again." });
    }
  },

  async update(req, res) {
    const { vol_id } = req.query.id;
    const data = req.body;
    const lastUpdate = new Date().getUTCDate();
    data.lastUpdate = lastUpdate;

    try {
      await connection("voluntaryAbilities")
        .where({
          voluntary_id: vol_id
        })
        .update(data);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error saving on db..." });
    }
  }
};
