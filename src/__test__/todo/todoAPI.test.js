import request from "supertest"
import app from "../../index.js"
import * as Input from './mock-data/todoinput.js'


const endpointUrl = "/todo/";
let token;
let firstTODO

beforeAll((done) => {
  request(app)
    .post('/user/login')
    .send(Input.user)
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});


describe(endpointUrl, () => {
  it("should not create TODO as Token is required" + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl+'create')
      .send(Input.task1);
      expect(response.statusCode).toBe(401);
      expect(response.body.status).toEqual(false);
      expect(response.body.message).toEqual("Token is required...please login first");
  });
  
  it("should create TODO successfully" + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl+'create')
      .set('Authorization', `Bearer ${token}`)
      .send(Input.task1);
      expect(response.statusCode).toBe(201);
      expect(response.body.status).toEqual(true);
      expect(response.body.message).toEqual("TODO created successfully");
  });

  it("should not create TODO as TODO with title is already exits" + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl+'create')
      .set('Authorization', `Bearer ${token}`)
      .send(Input.task1);
      expect(response.statusCode).toBe(406);
      expect(response.body.status).toEqual(false);
      expect(response.body.message).toEqual(`TODO with title ${Input.task1.title} created by same user already exits`);
  });

  it("should not get TODO list as Token is required" + endpointUrl, async () => {
    const response = await request(app)
      .get(endpointUrl+'get')
      expect(response.statusCode).toBe(401);
      expect(response.body.status).toEqual(false);
      expect(response.body.message).toEqual("Token is required...please login first");
  });

  it("should fetch TODO list successfully" + endpointUrl, async () => {
    const response = await request(app)
      .get(endpointUrl+'get')
      .set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toEqual(true);
      expect(response.body.message).toEqual("TODO list fetched");
      firstTODO = response.body.data[0]
  });

  it("should not update TODO status list as status is not provided" + endpointUrl, async () => {
    const response = await request(app)
      .patch(endpointUrl+'update/:todoId')
      expect(response.statusCode).toBe(422);
      expect(response.body.status).toEqual(false);
      expect(response.body.message).toEqual("\"status\" is required");
  });

  it("should not update TODO status list as status provided is not valid" + endpointUrl, async () => {
    const response = await request(app)
      .patch(endpointUrl+'update/:todoId')
      .send({status: "dsaklfjk"})
      expect(response.statusCode).toBe(422);
      expect(response.body.status).toEqual(false);
      expect(response.body.message).toEqual("\"status\" must be one of [Pending, In Progress, Completed]");
  });

  it("should not update TODO status list as token is not provided" + endpointUrl, async () => {
    const response = await request(app)
      .patch(endpointUrl+'update/:todoId')
      .send({status: "Pending"})
      expect(response.statusCode).toBe(401);
      expect(response.body.status).toEqual(false);
      expect(response.body.message).toEqual("Token is required...please login first");
  });

  it("should update TODO status successfully" + endpointUrl, async () => {
    const response = await request(app)
      .patch(endpointUrl+'update/'+firstTODO._id)
      .set('Authorization', `Bearer ${token}`)
      .send({status: "Completed"})
      expect(response.body.message).toEqual("TODO has been successfully updated");
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toEqual(true);
  });

})