const mongoose = require("mongoose");
const app = require("./config/server");
const request = require("supertest");

const params = {
  data: "hello, world",
  date: "2021-03-02T22:51:51.343Z",
  titulo: "New note",
  userID: 1614267608772,
};

describe("GetAllList", () => {
  let server;
  let connection;
  let note;
  beforeAll(async (done) => {
    connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const collections = await connection.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }

    server = app.listen(4000, () => {
      global.agent = request.agent(server);
      done();
    });
  });

  afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
  });

  it("returns an ok message", async (done) => {
    const response = await request(server)
      .get("/starter")
      .set("Accept", "application/json");

    expect(response.body).toStrictEqual({ ok: 1 });
    expect(response.statusCode).toBe(200);

    done();
  });

  it("should query all notes from a user", async (done) => {
    const response = await request(server)
      .get("/list-all-notes")
      .query({ userid: params.userID })
      .set("Accept", "application/json");
    expect(response.body.response).toStrictEqual([]);
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should insert a note", async (done) => {
    const response = await request(server)
      .post("/add-note")
      .send({ params })
      .set("Accept", "application/json");

    note = response.body.document;

    expect(response.body.response).toBe("Nota criada com sucesso.");
    expect(response.statusCode).toBe(200);
    expect(note).toHaveProperty("_id");
    done();
  });

  it("should query users note after inserting one", async (done) => {
    const response = await request(server)
      .get("/list-all-notes")
      .query({ userid: params.userID })
      .set("Accept", "application/json");
    expect(response.body.response.length).toBe(1);
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should query note", async (done) => {
    const response = await request(server)
      .get("/list-note")
      .query({ userid: params.userID, _id: note._id })
      .set("Accept", "application/json");
    expect(response.body.response).toHaveProperty("data");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should update note", async (done) => {
    const response = await request(server)
      .patch("/update-note")
      .send({ params: { data: "Olá, mundo", _id: note._id } })
      .set("Accept", "application/json");
    expect(response.body.response).toBe("Nota atualizada com sucesso.");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should query updated note", async (done) => {
    const response = await request(server)
      .get("/list-note")
      .query({ userid: params.userID, _id: note._id })
      .set("Accept", "application/json");
    expect(response.body.response).toHaveProperty("data", "Olá, mundo");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should delete note", async (done) => {
    const response = await request(server)
      .delete("/delete-note")
      .query({ _id: note._id })
      .set("Accept", "application/json");
    expect(response.body.response).toBe("Nota excluida com sucesso.");
    expect(response.statusCode).toBe(200);
    done();
  });
});
