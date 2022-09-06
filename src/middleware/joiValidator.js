import { registerUserSchema, loginUserSchema, updateUserSchema } from '../schemas/userJoiSchema.js'
import { registerTODOSchema, updateTODOSchema } from '../schemas/todoJoiSchema.js'

const requestValidator = (req, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        // joi error status
        error.status = 422; 
        return next(error);
    } else {
        req.body = value;
       return next();
    }
}

export const createUserSchema = (req, res, next) => {
    const schema = registerUserSchema
    requestValidator(req, next, schema);
}

export const loginSchema = (req, res, next) => {
    const schema = loginUserSchema
    requestValidator(req, next, schema);
}

export const updateSchema = (req, res, next) => {
    const schema = updateUserSchema
    requestValidator(req, next, schema);
}

export const createTODOSchema = (req, res, next) => {
    const schema = registerTODOSchema
    requestValidator(req, next, schema);
}

export const updateTODO = (req, res, next) => {
    const schema = updateTODOSchema
    requestValidator(req, next, schema);
}