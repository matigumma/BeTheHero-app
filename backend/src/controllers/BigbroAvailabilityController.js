const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const {
      availabilityName,
      availabilityDescription,
      availabilityQuantity,
      from,
      until,
      enable,
      bigbros_id
    } = req.body;

    const covered = false;
    const coveredByVoluntaryId = "";
    const lastUpdated = new Date().getUTCDate();

    try {
      await connection("bigbrosAvailability").insert({
        availabilityName,
        availabilityDescription,
        availabilityQuantity,
        from,
        until,
        enable,
        covered,
        coveredByVoluntaryId,
        lastUpdated,
        bigbros_id
      });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Creating needs on database fail, try again." });
    }
  },

  async update(req, res) {
    const { bro_id } = req.query.id;
    const data = req.body;
    const lastUpdate = new Date().getUTCDate();
    data.lastUpdate = lastUpdate;

    try {
      await connection("bigbrosAvailability")
        .where({
          bigbros_id: bro_id
        })
        .update(data);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error saving on db..." });
    }
  }
};
