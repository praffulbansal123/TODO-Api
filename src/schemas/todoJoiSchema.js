import Joi from "joi";

/*
* @author Prafful Bansal
* @description Joi validation for creating TODO
*/
export const registerTODOSchema = Joi.object({
    title: Joi.string().required().trim(),
    discription: Joi.string().required().trim().min(5),
    category: Joi.string().required().trim().valid('Home', 'Work', 'Learning'),
    priority: Joi.string().required().trim().valid('Low', 'Medium', 'High'),
    status: Joi.string().required().trim().valid('Pending', 'In Progress', 'Completed'),
    dueDate: Joi.date().required(),
    isDeleted: Joi.boolean().default(false)
})

/*
* @author Prafful Bansal
* @description Joi validation for updating TODO status
*/
export const updateTODOSchema = Joi.object({
    status: Joi.string().required().trim().valid('Pending', 'In Progress', 'Completed'),
})