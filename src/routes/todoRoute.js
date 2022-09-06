import express from "express";
import { createTODOSchema, updateTODO} from "../middleware/joiValidator.js";
import * as TODOController from "../controller/todoController.js"
import * as Middleware from "../middleware/auth.js"

const router = express.Router();

// Creating TODO route
router.post('/create', createTODOSchema, Middleware.authentication, TODOController.createTODOHandler)

// List of TODO by different filter querry
router.get('/get', Middleware.authentication, TODOController.getTODOHandler )

// Update TODO route
router.patch('/update/:todoId', updateTODO, Middleware.authentication, TODOController.updateTODOHandler)

// Delete TODO route
router.delete('/delete/:todoId', Middleware.authentication, TODOController.deleteTODOHandler)

export default router