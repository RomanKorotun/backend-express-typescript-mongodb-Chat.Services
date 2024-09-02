import mongoose, { Document, model, Schema } from "mongoose";
import {
  handleAddSettings,
  handleFindOneAndUpdateError,
  handleSaveError,
} from "./hooks.js";
import Joi from "joi";

interface ICustomeChatDocument extends Document {
  firstName: string;
  lastName: string;
  avatar: string;
  isActive: boolean;
  messages: {
    owner?: Schema.Types.ObjectId;
    message?: string;
    date?: string;
  }[];
  owner: Schema.Types.ObjectId;
}

const MessageSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "user" },
  message: { type: String },
  date: { type: String },
});

const ChatsSchema = new Schema<ICustomeChatDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    avatar: { type: String, required: true },
    messages: {
      type: [MessageSchema],
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

export const addChatSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const editChatSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
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

const Chat = model<ICustomeChatDocument>("chat", ChatsSchema);

export default Chat;
