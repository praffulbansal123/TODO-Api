import User from "../models/userModel.js";
import createError from "http-errors";

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