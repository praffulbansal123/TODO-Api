import logger from "../logger/logger.js";
import {createUser } from "../services/userServices.js"

export const registerUserHandler = async (req, res, next) => {
    try {

        const user = await createUser(req.body)

        return res.status(200).send({status: true, message: 'New user registered successfully', data: user})
    }
    catch(error){
        logger.info(error.message)
        next(error)
    }
}