import logger from "../logger/logger.js";
import { createTODO, getTODO, updateTodo, deleteTODO } from "../services/todoService.js"

/*
* @author Prafful Bansal
* @description Create a new TODO
* @route POST todo/create
*/
export const createTODOHandler = async (req, res, next) => {
    try {
        const input = req.body;
        const payload = req.decodedToken;
    
        const todo = await createTODO(input, payload);
    
        return res.status(201).send({status: true, message: "TODO created successfully", todoDetails: todo,});
    
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
};

/*
* @author Prafful Bansal
* @description Fetching TODO based on different filter query
* @route GET todo/get
*/
export const getTODOHandler = async (req, res, next) => {
    try {

        const input = req.query;
        const payload = req.decodedToken;

        const todoList = await getTODO(input, payload);

        return res.status(200).send({ status: true, message: "TODO list fetched", count: todoList.length, data: todoList})
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
};

/*
* @author Prafful Bansal
* @description Update TODO status
* @route PATCH todo/update/:todoId
*/
export const updateTODOHandler = async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        const input = req.body;
        const payload = req.decodedToken;
    
        const updatedTodo = await updateTodo(input, payload, todoId);
    
        return res.status(200).send({ status: true, message: "TODO has been successfully updated", data: updatedTodo})
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
}

/*
* @author Prafful Bansal
* @description Update TODO isDeleted to true
* @route PATCH todo/delete/:todoId
*/
export const deleteTODOHandler = async (req, res, next) => {
    try {
        const input = req.params.todoId;
        const payload = req.decodedToken;
    
        const deletedTodo = await deleteTODO(input, payload);
    
        return res.status(200).send({ status: true, message: "TODO has been successfully deleted", data: deletedTodo})
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
}
        