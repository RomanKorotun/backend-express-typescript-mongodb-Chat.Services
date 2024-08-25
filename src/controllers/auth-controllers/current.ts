import { Request, Response } from "express";

interface ICustomeRequest extends Request {
  user?: any;
}

const current = (req: ICustomeRequest, res: Response) => {
  const { username, avatar } = req.user;
  res.json({ username, avatar });
};
export default current;
