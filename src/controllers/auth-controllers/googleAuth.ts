import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { HttpError } from "../../helpers/index.js";
import User from "../../models/User.js";

interface ICustomeRequest extends Request {
  user?: any;
}

const { TOKEN_SECRET, TOKEN_TIME } = process.env;

const googleAuth = async (req: ICustomeRequest, res: Response) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };
  if (!TOKEN_SECRET || !TOKEN_TIME) {
    throw HttpError(500, "TOKEN_SECRET or TOKEN_TIME is undefined");
  }
  const token = jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: TOKEN_TIME,
  });
  await User.findByIdAndUpdate(id, { token });
  return res.redirect(`http://localhost:3000?token=${token}`);
};
export default googleAuth;
