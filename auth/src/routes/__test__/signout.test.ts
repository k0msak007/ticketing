import request from "supertest";
import { app } from "../../app";

it("Clear the cookie after signin out", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    let response = await request(app)
        .post("/api/users/signout")
        .send({})
        .expect(200)

    expect(response.get("Set-Cookie")[0]).toEqual(
        'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    )
})
