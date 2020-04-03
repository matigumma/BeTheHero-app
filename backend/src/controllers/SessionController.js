const connection = require("../database/connection");

module.exports = {
  async login(req, res) {
    const { uid } = req.body;
    try {
      const user = await connection("users")
        .where("id", uid)
        .select("*")
        .first();

      if (!user) {
        return res.status(400).json({ error: "User Not found ..." });
      }

      if (user.enabled === false) {
        return res
          .status(400)
          .json({ oldUser: user.email, error: "User inactive ..." });
      }

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Error looking on db..." });
    }
  },

  async create(req, res) {
    const {
      uid,
      name,
      surname,
      nickname,
      age,
      sexualIdentity,
      avatar,
      email,
      whatsapp,
      facebookId,
      city,
      direction,
      lat,
      lng
    } = req.body;

    const id = uid;
    const creationDate = new Date();
    const enabled = true;

    try {
      const alreadyRegistered = await connection("users")
        .where("email", email)
        .select("id")
        .first();

      if (alreadyRegistered) {
        return res.status(404).json({
          email: email,
          error:
            "Creating user on database fail, because this email is already registered."
        });
      }

      await connection("users").insert({
        id,
        name,
        surname,
        nickname,
        age,
        sexualIdentity,
        avatar,
        email,
        whatsapp,
        facebookId,
        city,
        direction,
        lat,
        lng,
        enabled,
        creationDate
      });

      return res.status(201).send();
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Creating user on database fail, try again." });
    }
  }
};
