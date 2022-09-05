import express from "express";
import { createUserSchema } from "../middleware/joiValidator.js";
import * as UserController from "../controller/userController.js"

const router = express.Router();

// Testing Route
router.get("/test", function (req, res) {
  res.send({ status: true, message: "test-api working fine" });
});

// Register user route
router.post('/register', createUserSchema, UserController.registerUserHandler)

export default router;
