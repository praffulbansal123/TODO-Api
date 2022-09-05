import express from "express";
import { createUserSchema, loginSchema, updateSchema } from "../middleware/joiValidator.js";
import * as UserController from "../controller/userController.js"
import * as Middleware from "../middleware/auth.js"

const router = express.Router();

// Testing Route
router.get("/test", function (req, res) {
  res.send({ status: true, message: "test-api working fine" });
});

// Register user route
router.post('/register', createUserSchema, UserController.registerUserHandler)

// Login user route
router.post('/login', loginSchema, UserController.loginUserHandler)

// Update user route
router.patch('/updateUser/:userId', updateSchema, Middleware.authentication, Middleware.authorizationByUserID,UserController.updateUserHandler)

// User Logout route
router.get('/logout', UserController.logoutUserHandler)

export default router;
