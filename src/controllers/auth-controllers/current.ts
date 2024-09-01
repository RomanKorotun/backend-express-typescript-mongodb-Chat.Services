import { Request, Response } from "express";
import Chat from "../../models/Chat.js";

interface ICustomeRequest extends Request {
  user?: any;
}

const current = async (req: ICustomeRequest, res: Response) => {
  const { username, avatar } = req.user;
  const chats = await Chat.find({ owner: req.user._id });
  res.json({ username, avatar, chats });
};
export default current;
