import express from "express";
import { createTODOSchema } from "../middleware/joiValidator.js";
import * as TODOController from "../controller/todoController.js"
import * as Middleware from "../middleware/auth.js"

const router = express.Router();

// Creating TODO route
router.post('/create', createTODOSchema, Middleware.authentication, TODOController.createTODOHandler)

export default router