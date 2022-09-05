import logger from "../logger/logger.js";
import {createTODO } from "../services/todoService.js"

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
        