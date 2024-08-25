import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req: Request, res: Response, next: NextFunction) => {
  const length = Object.keys(req.body).length;
  if (length === 0) {
    return next(HttpError(400, "Missing fields"));
  }
  next();
};
export default isEmptyBody;
