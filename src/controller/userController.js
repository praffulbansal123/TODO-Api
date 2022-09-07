import logger from "../logger/logger.js";
import {createUser, userLogin, userUpdate } from "../services/userServices.js"

/*
* @author Prafful Bansal
* @description User registration 
* @route POST user/register
*/
export const registerUserHandler = async (req, res, next) => {
    try {

        const user = await createUser(req.body)

        return res.status(201).send({status: true, message: 'New user registered successfully', data: user})
    }
    catch(error){
        logger.info(error.message)
        next(error)
    }
}

/*
* @author Prafful Bansal
* @description User login 
* @route POST user/login
*/
export const loginUserHandler = async (req, res, next) => {
    try {

        const login = await userLogin(req.body);

        req.session.user = login.user;

        res.header('Authorization', 'Bearer ' + login.token)

        return res.status(200).send({status: true, msg: "Login successfull", token: login.token, user: login.user})
       
    } catch (error) {
        logger.info(error.message);
        next(error);
    }
}

/*
* @author Prafful Bansal
* @description Update user details 
* @route PATCH user/updateUser
*/
export const updateUserHandler = async (req, res, next) => {
    try {
        const userId = req.decodedToken.userId
        const update = await userUpdate(req.body, userId)
        res.status(200).send({status: true, message: 'User updated successfully', data: update})
    } catch(error) {
        logger.info(error.message);
        next(error);
    }
}

/*
* @author Prafful Bansal
* @description User logout 
* @route GET  /user/logout
*/
export const logoutUserHandler =  async (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            throw new Error(err.message);
        }
    });
   return res.clearCookie("connect.sid").end("logout success");
}