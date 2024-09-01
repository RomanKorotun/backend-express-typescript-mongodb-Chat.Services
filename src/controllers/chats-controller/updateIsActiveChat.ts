import { Request, Response } from "express";
import Chat from "../../models/Chat.js";

interface ICustomeRequest extends Request {
  user?: any;
}

const updateIsActiveChat = async (req: ICustomeRequest, res: Response) => {
  const { id } = req.params;
  await Chat.findOneAndUpdate(
    { owner: req.user._id, isActive: true },
    { isActive: false }
  );
  await Chat.findOneAndUpdate({ owner: req.user._id, _id: id }, req.body);
  const allChats = await Chat.find({ owner: req.user._id });
  res.json({ chats: allChats });
};

export default updateIsActiveChat;
