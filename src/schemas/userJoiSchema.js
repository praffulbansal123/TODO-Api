import Joi from "joi";

export const registerUserSchema = Joi.object({
  title: Joi.string().required().trim().valid("Mr", "Mrs", "Miss"),
  fname: Joi.string().required().trim().min(3),
  lname: Joi.string().required().trim().min(3),
  email: Joi.string().required().email().trim().lowercase(),
  password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)).required(),
  phone: Joi.string().required().pattern(new RegExp(/^[6-9]\d{9}$/)),
});
