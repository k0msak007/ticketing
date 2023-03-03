import request from "supertest";
import { app } from "../../app";

it("fails when a email that does not exist is supplies", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplies", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password1"
        })
        .expect(400)
})

it("response with a cookie when given valid credentials", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    let response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
    expect(response.get("Set-Cookie")).toBeDefined()
})