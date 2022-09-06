import Joi from "joi";

export const registerTODOSchema = Joi.object({
    title: Joi.string().required().trim(),
    discription: Joi.string().required().trim().min(5),
    category: Joi.string().required().trim().valid('Home', 'Work', 'Learning'),
    priority: Joi.string().required().trim().valid('Low', 'Medium', 'High'),
    status: Joi.string().required().trim().valid('TODO', 'In Progress', 'Completed'),
    dueDate: Joi.date().required(),
    isDeleted: Joi.boolean().default(false)
})

export const updateTODOSchema = Joi.object({
    status: Joi.string().required().trim().valid('TODO', 'In Progress', 'Completed'),
})