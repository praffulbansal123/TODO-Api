import createError from "http-errors";
import logger from "../logger/logger.js";
import jwt from "jsonwebtoken";

/*
* @author Prafful Bansal
* @description Middleware of Authentication
*/
export const authentication = async function (req, res, next) {
  try {
    let token = req.headers["authorization"];

    if (!token || token.split(" ")[0] !== "Bearer") {
      throw new createError.Unauthorized("Token is required...please login first." );
    }

    token = token.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    error.status = 401;
    logger.info(error.message);
    next(error);
  }
};

/*
* @author Prafful Bansal
* @description Middleware of AuthorizationByUserID
*/
export const authorizationByUserID = async function (req, res, next) {
    try {
      const decodedToken = req.decodedToken;
      const userId = req.params.userId;

      if(!userId)
        throw createError.NotAcceptable("No user Id provided")
  
      if (decodedToken.userId !== userId)
        throw createError.Forbidden("Unauthorized access");
      next();
    } catch (error) {
      next(error);
    }
};
