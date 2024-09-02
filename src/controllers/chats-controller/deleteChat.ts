import { Request, Response } from "express";
import Chat from "../../models/Chat.js";

interface ICustomeRequest extends Request {
  user?: any;
}
const deleteChat = async (req: ICustomeRequest, res: Response) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const deleteChat = await Chat.findOneAndDelete({
    owner: userId,
    _id: id,
    isActive: true,
  });
  const chats = await Chat.find({ owner: userId });
  if (chats.length !== 0) {
    const _id = chats[chats.length - 1]._id;
    await Chat.findByIdAndUpdate(_id, {
      isActive: true,
    });
    const updateChats = await Chat.find({ owner: userId });
    res.json({ chats: updateChats, deleteChat });
    return;
  }
  res.json({ deleteChat });
};
export default deleteChat;
