import { Request, Response } from "express";
import User from "../../models/User.js";

interface ICustomeRequest extends Request {
  user?: any;
}

export const logout = async (req: ICustomeRequest, res: Response) => {
  const { email } = req.user;
  await User.findOneAndUpdate({ email }, { token: "" });
  res.json({ messsage: "Logout success" });
};
export default logout;
