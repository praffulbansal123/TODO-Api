import * as TODOController from "../../controller/todoController.js"
import TODO from "../../models/todoModel.js";
import * as Input from './mock-data/todoinput.js'
import httpMocks from "node-mocks-http"
import {jest} from '@jest/globals'

TODO.findOne = jest.fn();
TODO.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
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

  it("should return 201 response code", () => {
    TODOController.createTODOHandler(req, res, next);
    expect(res.statusCode).toBe(200);
  });
})