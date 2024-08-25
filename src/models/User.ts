import { Document, model, Schema } from "mongoose";
import Joi from "joi";
import {
  handleAddSettings,
  handleFindOneAndUpdateError,
  handleSaveError,
} from "./hooks.js";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface ICustomDocument extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  token?: string;
}

const UserSchema = new Schema<ICustomDocument>(
  {
    username: {
      type: String,
      minlength: [2, "Too short!"],
      maxlength: [50, "Too long!"],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      required: true,
    },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.post("save", handleSaveError);
UserSchema.pre("findOneAndUpdate", handleAddSettings);
UserSchema.post("findOneAndUpdate", handleFindOneAndUpdateError);

export const userRegisterSchema = Joi.object({
  username: Joi.string()
    .min(2)
    .message("To short!")
    .max(50)
    .message("To long!")
    .required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const User = model<ICustomDocument>("user", UserSchema);
export default User;
