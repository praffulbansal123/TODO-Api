import User from "../models/userModel.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/*
* @author Prafful Bansal
* @description Service for creating new users
*/
export const createUser = async (input) => {
  try {

    // verify email and phone number are unique
    const isEmailExist = await User.findOne({ email: input.email });

    if (isEmailExist) {
      throw createError.NotAcceptable("Email already exists");
    }

    const isPhoneNumberExist = await User.findOne({ phone: input.phone });

    if (isPhoneNumberExist) {
      throw createError.NotAcceptable("Phone number already exists");
    }

    const user = await User.create(input);

    // masking password
    user.password = undefined;

    return user;
  } catch (error) {
    throw error;
  }
};

/*
* @author Prafful Bansal
* @description Service for login
*/
export const userLogin = async (input) => {
  try {
    if (input.email === undefined) {
      throw createError.BadRequest(`Email is required for login`);
    }

    const user = await User.findOne({email: input.email});
  
    if (!user) {
      throw createError.NotFound(`User with ${input.email} does not exist`);
    }
  
    // comparing password
    const isPasswordMatch = await bcrypt.compare(input.password, user.password);
  
    if (!isPasswordMatch) {
      throw createError.Unauthorized("Invalid Password");
    }
  
    // JWT logic
    const payload = {
      userId: user._id.toString(),
    };
  
    const secret = process.env.JWT_SECRET;
    const expiry = { expiresIn: process.env.JWT_EXPIRY };
  
    const token = jwt.sign(payload, secret, expiry);
  
    // masking user password
    user.password = undefined;
  
    const obj = { token: token, user: user };
  
    return obj;
  } catch (error) {
    throw error;
  }
};

/*
* @author Prafful Bansal
* @description Service for updating user details
*/
export const userUpdate = async (input, userId) => {
  try {

    const user = await User.findById(userId)

    if(user.phone && user.phone === input.phone)
      throw createError.NotAcceptable(`user phone no is already upto date`)
    
    if(user.fname && user.fname === input.fname)
      throw createError.NotAcceptable(`user fname no is already upto date`)
    
    if(user.lname && user.lname === input.lname)
      throw createError.NotAcceptable(`user lname no is already upto date`)

    const updateUser = await User.findOneAndUpdate({_id: userId}, {$set: (input)}, {new: true})

    // masking password
    updateUser.password = undefined
    
    return updateUser
  } catch(error) {
    throw (error)
  }
};