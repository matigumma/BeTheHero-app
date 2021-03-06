const generateUniqueId = require("../utils/generateUniqueId");
const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    const list = await connection("ongs").select("*");

    return res.json(list);
  },

  async create(req, res) {
    const { name, email, city, whatsapp, uf } = req.body;

    const id = generateUniqueId();

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
};
