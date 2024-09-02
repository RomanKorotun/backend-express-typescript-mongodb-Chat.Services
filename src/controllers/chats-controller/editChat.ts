import { Request, Response } from "express";
import Chat from "../../models/Chat.js";

interface ICustomeRequest extends Request {
  user?: any;
}

const editChat = async (req: ICustomeRequest, res: Response) => {
  const { _id } = req.user;
  const { id } = req.params;
  const updateChat = await Chat.findOneAndUpdate(
    { owner: _id, _id: id },
    req.body
  );
  res.json(updateChat);
};
export default editChat;
