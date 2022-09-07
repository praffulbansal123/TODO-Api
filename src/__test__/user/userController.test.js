import * as UserController from "../../controller/userController.js"
import User from "../../models/userModel.js";
import * as Input from './mock-data/input.js'
import httpMocks from "node-mocks-http"
import {jest} from '@jest/globals'

User.findOne = jest.fn();
User.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("UserController.registerUserHandler", () => {
  beforeEach(() => {
    req.body = Input.user3;
  });

  it("should have a registerUserHandler function", () => {
    
    expect(typeof UserController.registerUserHandler).toBe("function");
  });

  it("should call User.findOne to check email", () => {
    UserController.registerUserHandler(req, res, next);
    expect(User.findOne).toBeCalledWith({email: Input.user3.email});
  });

  it("should call User.findOne to check phone", () => {
    UserController.registerUserHandler(req, res, next);
    expect(User.findOne).toBeCalledWith({phone: Input.user3.phone});
  });

  it("should call User.create and create the user", () => {
    UserController.registerUserHandler(req, res, next);
    expect(User.create).toBeCalledWith(Input.user3);
  });

  it("should return 201 response code", () => {
    UserController.registerUserHandler(req, res, next);
    expect(res.statusCode).toBe(200);
  });
})