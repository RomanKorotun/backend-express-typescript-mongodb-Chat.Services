import { Request, Response } from "express";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const { TOKEN_SECRET, TOKEN_TIME } = process.env;

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  if (!TOKEN_SECRET || !TOKEN_TIME) {
    throw HttpError(500, "TOKEN_SECRET or TOKEN_TIME is undefined");
  }

  const avatarDefault =
    "https://res.cloudinary.com/drqeo1pu5/image/upload/v1723481110/psychologists.services/avatars/avatar_default_jpg_beamoi.jpg";

  const hashPassword = await bcryptjs.hash(password, 10);
  console.log(hashPassword);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatar: avatarDefault,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: TOKEN_TIME,
  });

  const updateNewUser = await User.findByIdAndUpdate(newUser._id, {
    token,
  });

  res.json({
    username: updateNewUser?.username,
    email: updateNewUser?.email,
    avatar: updateNewUser?.avatar,
    token: updateNewUser?.token,
  });
};
export default register;
