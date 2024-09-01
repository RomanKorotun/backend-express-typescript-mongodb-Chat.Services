import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { HttpError } from "../../helpers/index.js";
import User from "../../models/User.js";
import Chat from "../../models/Chat.js";

interface IListUsers {
  firstName: string;
  lastName: string;
  isActive: boolean;
}

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

  const updateNewUser = await User.findByIdAndUpdate(id, { token });

  const listChats = await Chat.find({ owner: updateNewUser?._id });

  if (listChats.length === 0) {
    const listUsers: IListUsers[] = [
      {
        firstName: "Roman",
        lastName: "Korotun",
        isActive: false,
      },
      {
        firstName: "Oleg",
        lastName: "Korotun",
        isActive: false,
      },
      {
        firstName: "Yuriy",
        lastName: "Korotun",
        isActive: true,
      },
    ];

    await Promise.allSettled(
      listUsers.map(async (user) => {
        return await Chat.create({
          firstName: user.firstName,
          lastName: user.lastName,
          isActive: user.isActive,
          avatar:
            "https://res.cloudinary.com/drqeo1pu5/image/upload/v1723481110/psychologists.services/avatars/avatar_default_jpg_beamoi.jpg",
          owner: updateNewUser?._id,
        });
      })
    );
  }

  return res.redirect(
    `https://romankorotun.github.io/test-task-frontend-Reenbit/register?token=${token}`
  );
};
export default googleAuth;
