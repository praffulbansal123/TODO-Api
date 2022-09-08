import * as TODOController from "../../controller/todoController.js"
import TODO from "../../models/todoModel.js";
import * as Input from './mock-data/todoinput.js'
import httpMocks from "node-mocks-http"
import {jest} from '@jest/globals'

TODO.findOne = jest.fn();
TODO.create = jest.fn();
TODO.find = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TODOController.createTODOHandler", () => {
  beforeEach(() => {
    req.body = Input.task1;
    req.decodedToken = Input.payload
  });

  it("should have a createTODOHandler function", () => {
    
    expect(typeof TODOController.createTODOHandler).toBe("function");
  });

  it("should call TODO.findOne function", () => {
    TODOController.createTODOHandler(req, res, next);
    expect(TODO.findOne).toBeCalledWith({title: Input.task1.title, createdBy: Input.payload.userId, isDeleted: false});
  });

  it("should call TODO.create function", () => {
    TODOController.createTODOHandler(req, res, next);
    expect(TODO.create).toBeCalledWith(Input.task1);
  });

  it("should return 201 response code", async () => {
    await TODOController.createTODOHandler(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy()
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "User can not be created" };
    const rejectedPromise = Promise.reject(errorMessage);
    TODO.create.mockReturnValue(rejectedPromise);
    await TODOController.createTODOHandler(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
})

describe("TODOController.getTODOHandler", () => {
  beforeEach(() => {
    req.query = Input.condition
    req.decodedToken = Input.payload
  });

  it("should have a getTODOHandler function", () => {
    expect(typeof TODOController.getTODOHandler).toBe("function");
  });

  it("should call TODO.find function", async () => {
    await TODOController.getTODOHandler(req, res, next);
    expect(TODO.find).toBeCalledWith({priority: Input.condition.priority, createdBy: Input.payload.userId, isDeleted: false});
  });

  it("should return 200 response code", async () => {
    await TODOController.getTODOHandler(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "User can not be created" };
    const rejectedPromise = Promise.reject(errorMessage);
    TODO.find.mockReturnValue(rejectedPromise);
    await TODOController.getTODOHandler(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
})