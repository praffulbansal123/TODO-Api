import TODO from "../models/todoModel.js";
import createError from "http-errors";

export const createTODO = async (input, payload) => {
    try {
        if(!payload.userId)
            throw createError.NotFound("Missing userId");

        // adding creator id
        input.createdBy = payload.userId;
      
        // creating order
        const orderDetails = await TODO.create(input);
        return orderDetails;
    }   catch (error) {
            throw error;
    }
};

export const getTODO = async (input, payload) => {
    try{

        if(input.status && !['TODO', 'In Progress', 'Completed'].includes(input.status))
            throw createError.BadRequest(`${input.status} is not allowed`);
        
        if(input.priority && !['Low', 'Medium', 'High'].includes(input.priority))
            throw createError.BadRequest(`${input.priority} is not allowed`);

        if(input.category && !['Home', 'Work', 'Learning'].includes(input.category))
            throw createError.BadRequest(`${input.category} is not allowed`);
        
        input.createdBy = payload.userId
        input.isDeleted = false

        const todoList = await TODO.find(input)

        if(todoList.length === 0){
            throw createError.NotFound("TODO list does not exits");
        }
        
        return todoList
    } catch (error) {
        throw error;
    }
};

export const updateTodo = async (input, payload, todoId) => {
    try {
        
        const todoById = await TODO.find({_id: todoId, isDeleted: false})

        if(todoById.length === 0)
            throw createError.NotFound("TODO not found or is Deleted");

        if(payload.userId !== todoById.createdBy.toString())
            throw createError.Forbidden(`User is not allowed to update this TODO`);
        
        if(input.status === todoById.status)
            throw createError.NotAcceptable(`TODO status is already ${input.status}`)
        
        // updating TODO status
        const updated = await TODO.findByIdAndUpdate({_id : todoId}, {$set : {status : input.status}}, {new : true});
        
        return updated
    } catch (error) {
        throw error;
    }
}

export const deleteTODO = async (input, payload) => {
    try {
        const todoById = await TODO.find({_id: input, isDeleted: false})

        if(todoById.length === 0)
            throw createError.NotFound("TODO not found or is Deleted");

        if(payload.userId !== todoById.createdBy.toString())
            throw createError.Forbidden(`User is not allowed to delete this TODO`);

        // deleting TODO
        const deleted = await TODO.findByIdAndUpdate({_id : input}, {$set : {isDeleted : true}}, {new : true});
        
        return deleted

    } catch (error) {
        throw error;
    }
}