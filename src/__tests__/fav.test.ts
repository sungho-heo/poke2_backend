import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import User from "../models/User";

let token: string;

beforeAll(async () => {
  // db 연결
  await mongoose.connect(process.env.MONGO_URI!);

  // 테스트 유저 생성 및 토큰 발급.
  const res = await request(app).post("/api/auth/signup").send({
    nickname: "test",
    email: "test@test.com",
    password: "123",
  });
  token = res.body.token;
});

// 테스트 끝나면 데이터베이스 연결해제
afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // 테스트 전 데이터 초기화
  await User.deleteMany({});
  const res = await request(app).post("/api/auth/signup").send({
    nickname: "test",
    email: "test@test.com",
    password: "123",
  });
  token = res.body.token;
});

describe("GET /api/fav", () => {
  it("should return the user's favorite list", async () => {
    const res = await request(app)
      .get("/api/fav")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("fav");
  });
});

describe("POST /api/fav/add", () => {
  it("should add a net favorite pokemon", async () => {
    const res = await request(app)
      .post("/api/fav/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ pokemonName: "Pikachu" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("fav");
    expect(res.body.fav).toContain("Pikachu");
  });

  it("should not add duplicate favorite pokemon", async () => {
    await request(app)
      .post("/api/fav/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ pokemonName: "Pikachu" });

    const res = await request(app)
      .post("/api/fav/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ pokemonName: "Pikachu" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("fav");
    expect(res.body.fav).toEqual(["Pikachu"]);
  });
});

describe("DELETE /api/fav/remove/:pokemonName", () => {
  beforeEach(async () => {
    await request(app)
      .post("/api/fav/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ pokemonName: "Pikachu" });
  });

  it("should remove a favorite pokemon", async () => {
    const res = await request(app)
      .delete("/api/fav/remove/Pikachu")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("fav");
    expect(res.body.fav).not.toContain("Pikachu");
  });
});
