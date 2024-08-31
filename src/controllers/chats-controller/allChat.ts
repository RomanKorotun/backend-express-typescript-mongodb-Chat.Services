import { Request, Response } from "express";
import Chat from "../../models/Chat.js";

const allChat = async (req: Request, res: Response) => {
  const chats = await Chat.find({});
  res.json(chats);
};

export default allChat;
