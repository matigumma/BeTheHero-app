const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Ong", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  it("should be able to create a Ong", async () => {
    const res = await request(app)
      .post("/ongs")
      .send({
        name: "testName",
        email: "test@email.com",
        whatsapp: "54915578901",
        city: "cityTest",
        uf: "AA"
      });

    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toHaveLength(8);
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
