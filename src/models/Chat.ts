import mongoose, { Document, model, Schema } from "mongoose";
import {
  handleAddSettings,
  handleFindOneAndUpdateError,
  handleSaveError,
} from "./hooks.js";
import Joi from "joi";

interface ICustomeDocument extends Document {
  firstName: string;
  lastName: string;
  avatar: string;
  isActive: boolean;
  messages: {
    owner?: Schema.Types.ObjectId;
    ref: "user";
    message: string;
    date: string;
  }[];
  owner: { _id: mongoose.Types.ObjectId; email: string };
}

const ChatsSchema = new Schema<ICustomeDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    avatar: { type: String, required: true },
    messages: [
      {
        owner: { type: Schema.Types.ObjectId, ref: "user" },
        message: { type: String, required: true },
        date: { type: String },
      },
    ],
    owner: {
      _id: { type: Schema.Types.ObjectId, ref: "user", required: true },
      email: { type: String, required: true },
    },
  },
  { versionKey: false, timestamps: true }
);

export const addChatSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const updateIsActiveChatSchema = Joi.object({
  isActive: Joi.boolean().required(),
});

export const addMessageSchema = Joi.object({
  message: Joi.string().required(),
});

ChatsSchema.post("save", handleSaveError);
ChatsSchema.pre("findOneAndUpdate", handleAddSettings);
ChatsSchema.post("findOneAndUpdate", handleFindOneAndUpdateError);

const Chat = model<ICustomeDocument>("chat", ChatsSchema);

export default Chat;
