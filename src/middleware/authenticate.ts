import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import User from "../models/User.js";
import "dotenv/config.js";

interface ICustomeRequest extends Request {
  user?: any;
}

interface IPayload {
  id: string;
}

const { TOKEN_SECRET } = process.env;

const authenticate = async (
  req: ICustomeRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization is missing"));
  }
  const [Bearer, token] = authorization.split(" ");
  if (Bearer !== "Bearer") {
    return next(HttpError(401, "Bearer is missing"));
  }
  try {
    if (!TOKEN_SECRET) {
      return next(HttpError(500, "TOKEN_SECRET is undefined"));
    }
    const payload = jwt.verify(token, TOKEN_SECRET) as IPayload;
    const user = await User.findById(payload.id);
    if (!user || user.token !== token || !user.token) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error: any) {
    next(HttpError(401, error.message));
  }
};
export default authenticate;
