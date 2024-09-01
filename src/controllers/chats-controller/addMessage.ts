import { Request, response, Response } from "express";
import Chat from "../../models/Chat.js";
import { wsServer } from "../../app.js";
import axios from "axios";

interface ICustomeRequest extends Request {
  user?: any;
}

const addMessage = async (req: ICustomeRequest, res: Response) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { message } = req.body;
  const updateChat = await Chat.findOneAndUpdate(
    { _id: id, owner: _id },
    { $push: { messages: { owner: id, message, date: new Date() } } }
  );
  res.json(updateChat);
  const { data } = await axios.get(
    "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
  );

  setTimeout(async () => {
    const updateQuoteChat = await Chat.findOneAndUpdate(
      { _id: id, owner: _id },
      { $push: { messages: { message: data.quoteText, date: new Date() } } }
    );
    wsServer.emit("quoteResponse", updateQuoteChat);
  }, 3000);
};
export default addMessage;
