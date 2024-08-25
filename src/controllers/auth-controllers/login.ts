import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import "dotenv/config.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";

const { TOKEN_SECRET, TOKEN_TIME } = process.env;

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Your Email or password is wrong");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Your Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  if (!TOKEN_SECRET || !TOKEN_TIME) {
    throw HttpError(500, "TOKEN_SECRET or TOKEN_TIME is undefined");
  }

  const token = jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: TOKEN_TIME,
  });

  const updateUser = await User.findOneAndUpdate({ email }, { token });

  res.json({
    username: updateUser?.username,
    avatar: updateUser?.avatar,
    token: updateUser?.token,
  });
};
export default login;
