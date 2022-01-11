import "../fixture";

import { request as req } from "../request";

const AUTHORIZATION_HEADER = {
  authorization: `Bearer ${process.env.API_TOKEN}`,
};

const request = req();

describe("/players", () => {
  describe("400 - Bad Request", () => {
    test("POST /players", async () => {
      expect.assertions(1);

      const res = await request
        .post("/players")
        .set(AUTHORIZATION_HEADER)
        .send({});

      expect(res.status).toBe(400);
    });
    test("GET /players/:playerId", async () => {
      expect.assertions(1);

      const res = await request.get("/players/invalid");

      expect(res.status).toBe(400);
    });
    test("PATCH /players/:playerId", async () => {
      expect.assertions(2);

      const res1 = await request
        .patch("/players/invalid")
        .set(AUTHORIZATION_HEADER)
        .send({ classType: "wizard" });

      expect(res1.status).toBe(400);

      const res2 = await request
        .patch("/players/invalid")
        .set(AUTHORIZATION_HEADER)
        .send({});

      expect(res2.status).toBe(400);
    });
    test("DELETE /players/:playerId", async () => {
      expect.assertions(1);

      const res = await request
        .delete("/players/invalid")
        .set(AUTHORIZATION_HEADER);

      expect(res.status).toBe(400);
    });
  });

  describe("401 - Unauthorized", () => {
    test("POST /players", async () => {
      expect.assertions(1);

      const res = await request.post("/players").send({
        nickName: "crazyPotatoFighter123",
        age: 18,
        level: 20,
        classType: "summoner",
        description: "Can summon creatures to fight for him",
      });

      expect(res.status).toBe(401);
    });

    test("PATCH /players/:playerId", async () => {
      expect.assertions(1);

      const res = await request
        .patch("/players/1")
        .send({ classType: "wizard" });

      expect(res.status).toBe(401);
    });

    test("DELETE /players/:playerId", async () => {
      expect.assertions(1);

      const res = await request.delete("/players/1");

      expect(res.status).toEqual(401);
    });
  });

  describe("404 - Not Found", () => {
    test("GET /players/:playerId", async () => {
      expect.assertions(1);

      const res = await request.get("/players/97239");

      expect(res.status).toBe(404);
    });

    test("PATCH /players/:playerId", async () => {
      expect.assertions(1);

      const res = await request
        .patch("/players/97239")
        .set(AUTHORIZATION_HEADER)
        .send({ classType: "wizard" });

      expect(res.status).toBe(404);
    });

    test("DELETE /players/:playerId", async () => {
      expect.assertions(1);

      const res = await request
        .delete("/players/9999")
        .set(AUTHORIZATION_HEADER);

      expect(res.status).toBe(404);
    });
  });

  describe("200 - OK", () => {
    test("GET /players", async () => {
      expect.assertions(2);

      const res = await request.get("/players");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    test("GET /players/:playerId", async () => {
      expect.assertions(3);

      const res1 = await request
        .post("/players")
        .set(AUTHORIZATION_HEADER)
        .send({
          nickName: "testPlayer",
          age: 18,
          level: 20,
          classType: "summoner",
          description: "Can summon creatures to fight for him",
        });

      expect(res1.status).toBe(201);

      const res2 = await request.get(`/players/${res1.body.id}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);
    });

    test("PATCH /books/:bookId", async () => {
      expect.assertions(6);

      const res1 = await request
        .post("/players")
        .set(AUTHORIZATION_HEADER)
        .send({
          nickName: "testPlayer",
          age: 18,
          level: 20,
          classType: "summoner",
          description: "Can summon creatures to fight for him",
        });

      expect(res1.status).toBe(201);

      const res2 = await request.get(`/players/${res1.body.id}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);

      const res3 = await request
        .patch(`/players/${res1.body.id}`)
        .set(AUTHORIZATION_HEADER)
        .send({ classType: "wizard" });

      expect(res3.status).toBe(200);
      expect(res3.body).not.toEqual(res2.body);
      expect(res3.body).toEqual({ ...res2.body, classType: "wizard" });
    });
  });

  describe("204 - No body", () => {
    test("DELETE /players/:playerId", async () => {
      expect.assertions(5);

      const res1 = await request
        .post("/players")
        .set(AUTHORIZATION_HEADER)
        .send({
          nickName: "crazyPotatoFighter123",
          age: 18,
          level: 20,
          classType: "summoner",
          description: "Can summon creatures to fight for him",
        });

      expect(res1.status).toBe(201);

      const res2 = await request.get(`/players/${res1.body.id}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);

      const res3 = await request
        .delete(`/players/${res1.body.id}`)
        .set(AUTHORIZATION_HEADER);

      expect(res3.status).toBe(204);

      const res4 = await request.get(`/players/${res1.body.id}`);

      expect(res4.status).toBe(404);
    });
  });
});
