const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("voluntary").count();

    try {
      const voluntaryList = await connection("voluntary")
        .join(
          "voluntaryNeeds",
          "voluntaryNeeds.voluntary_id",
          "=",
          "voluntary.id"
        )
        .limit(5)
        .offset((page - 1) * 5)
        .where("voluntary.valid", true)
        .select([
          "voluntary.*",
          "voluntaryNeeds.criticalStatus",
          "voluntaryNeeds.description",
          "voluntaryNeeds.needRoof",
          "voluntaryNeeds.needFood",
          "voluntaryNeeds.needTransport",
          "voluntaryNeeds.needCleanliness",
          "voluntaryNeeds.needHeal",
          "voluntaryNeeds.needFriendship",
          "voluntaryNeeds.needOther",
          "voluntaryNeeds.date"
        ]);

      res.header("X-Total-Count", count["count(*)"]);
      return res.json(voluntaryList);
    } catch (error) {
      return res.status(400).json({ error: "Error querying database." });
    }
  },

  async create(req, res) {
    const {
      uid,
      valid,
      docType,
      doc,
      nationality,
      originAddress,
      originContactName,
      originContactMail,
      originContactPhone,
      actualCity,
      actualPlaceName,
      actualPlaceDirection,
      actualPlaceContactName,
      actualPlaceContactEmail,
      actualPlaceContactPhone
    } = req.body;

    const user_id = uid;
    const created = new Date().getUTCDate();
    const lastUpdate = new Date().getUTCDate();

    try {
      const voluntary_id = await connection("voluntary")
        .returning("id")
        .insert({
          valid,
          created,
          lastUpdate,
          docType,
          doc,
          nationality,
          originAddress,
          originContactName,
          originContactMail,
          originContactPhone,
          actualCity,
          actualPlaceName,
          actualPlaceDirection,
          actualPlaceContactName,
          actualPlaceContactEmail,
          actualPlaceContactPhone,
          user_id
        });

      return res.json({ voluntary_id });
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Creating volunteer on database fail, try again." });
    }
  },

  async update(req, res) {
    const id = req.headers.authid;
    const { vol_id } = req.query.id;
    const data = req.body;

    try {
      await connection("voluntary")
        .where({
          id: vol_id,
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
    const { vol_id } = req.query.id;

    try {
      await connection("voluntary")
        .where({
          id: vol_id,
          user_id: id
        })
        .update({ valid: false });
      //sendMail
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error deleting on db..." });
    }
  }
};
