import logger from "../logger/logger.js";
import { createTODO, getTODO, updateTodo, deleteTODO } from "../services/todoService.js"

export const createTODOHandler = async (req, res, next) => {
    try {
        const input = req.body;
        const payload = req.decodedToken;
    
        const todo = await createTODO(input, payload);
    
        return res.status(201).send({status: true,message: "TODO created successfully",todoDetails: todo,});
    
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
};

export const getTODOHandler = async (req, res, next) => {
    try {

        const input = req.query;
        const payload = req.decodedToken;

        const todoList = await getTODO(input, payload);

        return res.status(201).send({ status: true, message: "TODO list fetched", count: todoList.length, data: todoList})
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
};

export const updateTODOHandler = async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        const input = req.body;
        const payload = req.decodedToken;
    
        const updatedTodo = await updateTodo(input, payload, todoId);
    
        return res.status(201).send({ status: true, message: "TODO has been successfully updated", data: updatedTodo})
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
}

export const deleteTODOHandler = async (req, res, next) => {
    try {
        const input = req.params.todoId;
        const payload = req.decodedToken;
    
        const deletedTodo = await deleteTODO(input, payload);
    
        return res.status(201).send({ status: true, message: "TODO has been successfully deleted", data: deletedTodo})
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
}
        