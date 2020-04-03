const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    try {
      const user = await connection("users")
        .where("enabled", true)
        .select("*");

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error looking on db..." });
    }
  },

  async update(req, res) {
    const id = req.headers.authid;
    const data = req.body;

    try {
      await connection("users")
        .where("id", id)
        .update(data);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error saving on db..." });
    }
  },

  async delete(req, res) {
    const id = req.headers.authid;

    try {
      await connection("users")
        .where("id", id)
        .update({ enabled: false });
      //sendMail
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error deleting on db..." });
    }
  }
};
