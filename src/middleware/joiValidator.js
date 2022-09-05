import { registerUserSchema } from '../schemas/userJoiSchema.js'

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
