const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const {
      critilcalStatus,
      description,
      needRoof,
      needFood,
      needTransport,
      needCleanliness,
      needHeal,
      needFriendship,
      needOther,
      voluntary_id
    } = req.body;

    const date = new Date().getUTCDate();

    try {
      await connection("voluntaryNeeds").insert({
        critilcalStatus,
        description,
        needRoof,
        needFood,
        needTransport,
        needCleanliness,
        needHeal,
        needFriendship,
        needOther,
        date,
        voluntary_id
      });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Creating needs on database fail, try again." });
    }
  },

  async update(req, res) {
    const { vol_id } = req.query.id;
    const data = req.body;
    const lastUpdate = new Date().getUTCDate();
    data.lastUpdate = lastUpdate;

    try {
      await connection("voluntaryNeeds")
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
