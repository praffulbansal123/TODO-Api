import request from "supertest"
import app from "../../index.js"
import * as Input from './mock-data/input.js'


const endpointUrl = "/user/register";

describe(endpointUrl, () => {
  it("should create User successfully" + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(Input.user3);
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toEqual(true);
    expect(response.body.message).toEqual("New user registered successfully");
  });  
  
  it("should not create user as email already exits" + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(Input.user1);
    expect(response.statusCode).toBe(406);
    expect(response.body.status).toEqual(false);
    expect(response.body.message).toEqual("Email already exists");
  });

  it("should not create user as phone already exits" + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(Input.user2);
    expect(response.statusCode).toBe(406);
    expect(response.body.status).toEqual(false);
    expect(response.body.message).toEqual("Phone number already exists");
  });
})

const endpointUrl1 = "/user/login"

describe(endpointUrl, () => {
  it("should allow user tobe successfully logged in" + endpointUrl1, async () => {
    const response = await request(app)
      .post(endpointUrl1)
      .send({email: "user1@gmail.com", password: "Password@1"});
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toEqual(true);
    expect(response.body.message).toEqual("Login successfull");
  });

  it("should return Invalid password" + endpointUrl1, async () => {
    const response = await request(app)
      .post(endpointUrl1)
      .send({email: "user1@gmail.com", password: "Password@2"});
    expect(response.statusCode).toBe(401);
    expect(response.body.status).toEqual(false);
    expect(response.body.message).toEqual("Invalid Password");
  })

  it("should return Invalid EmailId" + endpointUrl1, async () => {
    const response = await request(app)
      .post(endpointUrl1)
      .send({email: "usergmail.com", password: "Password@1"});
    expect(response.statusCode).toBe(422);
    expect(response.body.status).toEqual(false);
    expect(response.body.message).toEqual("\"email\" must be a valid email");
  })

  it("should give error that eamil does not exits" + endpointUrl1, async () => {
    const response = await request(app)
      .post(endpointUrl1)
      .send({email: "user10@gmail.com", password: "Password@1"});
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toEqual(false);
  })
})