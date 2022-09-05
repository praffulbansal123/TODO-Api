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