import { Request, Response } from "express";
import Chat from "../../models/Chat.js";

interface ICustomeRequest extends Request {
  user?: any;
}

const addChat = async (req: ICustomeRequest, res: Response) => {
  const { _id } = req.user;
  const { firstName, lastName } = req.body;
  const chat = await Chat.create({
    firstName,
    lastName,
    isActive: false,
    avatar:
      "https://res.cloudinary.com/drqeo1pu5/image/upload/v1723481110/psychologists.services/avatars/avatar_default_jpg_beamoi.jpg",
    owner: _id,
  });
  res.status(201).json(chat);
};

export default addChat;
