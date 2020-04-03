const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("bigbros").count();

    try {
      const bigbrosList = await connection("bigbros")
        .where("bigbros.enabled", true)
        .join("bigbrosAvailability", function() {
          this.on("bigbrosAvailability.bigbros_id", "=", "bigbros.id").andOn(
            "bigbros.enable",
            "=",
            knex.raw("true")
          );
        })
        .limit(5)
        .offset((page - 1) * 5)
        .select([
          "bigbros.*",
          "bigbrosAvailability.availabilityName",
          "bigbrosAvailability.availabilityDescription",
          "bigbrosAvailability.availabilityQuantity",
          "bigbrosAvailability.from",
          "bigbrosAvailability.until",
          "bigbrosAvailability.lastUpdated"
        ]);

      res.header("X-Total-Count-Bros", count["count(*)"]);
      return res.json(bigbrosList);
    } catch (error) {
      return res.status(400).json({ error: "Error querying database." });
    }
  },

  async create(req, res) {
    const { verified, businessLocal, website } = req.body;

    const user_id = uid;
    const lastUpdate = new Date().getUTCDate();

    try {
      const bigbros_id = await connection("bigbros")
        .returning("id")
        .insert({
          verified,
          businessLocal,
          website,
          lastUpdate,
          user_id
        });

      return res.json({ bigbros_id });
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Creating volunteer on database fail, try again." });
    }
  },

  async update(req, res) {
    const id = req.headers.authid;
    const { bro_id } = req.query.id;
    const data = req.body;

    try {
      await connection("bigbros")
        .where({
          id: bro_id,
          user_id: id
        })
        .update(data);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error saving on db..." });
    }
  },

  async delete(req, res) {
    const id = req.headers.authid;
    const { bro_id } = req.query.id;

    try {
      await connection("bigbros")
        .where({
          id: bro_id,
          user_id: id
        })
        .update({ enabled: false });
      //sendMail
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error deleting on db..." });
    }
  }
};
