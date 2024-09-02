import express, { Router } from "express";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middleware/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import {
  addChat,
  addMessage,
  deleteChat,
  editChat,
  updateIsActiveChat,
} from "../../controllers/chats-controller/index.js";
import { isValidBody } from "../../decorators/index.js";
import {
  addChatSchema,
  addMessageSchema,
  editChatSchema,
  updateIsActiveChatSchema,
} from "../../models/Chat.js";

const chatsRouter: Router = express.Router();

chatsRouter.post(
  "/",
  authenticate,
  isEmptyBody,
  isValidBody(addChatSchema),
  ctrlWrapper(addChat)
);

chatsRouter.patch(
  "/:id/isActive",
  authenticate,
  isValidId,
  isEmptyBody,
  isValidBody(updateIsActiveChatSchema),
  ctrlWrapper(updateIsActiveChat)
);

chatsRouter.put(
  "/:id/addmessage",
  authenticate,
  isValidId,
  isEmptyBody,
  isValidBody(addMessageSchema),
  ctrlWrapper(addMessage)
);

chatsRouter.put(
  "/:id/editchat",
  authenticate,
  isValidId,
  isEmptyBody,
  isValidBody(editChatSchema),
  ctrlWrapper(editChat)
);

chatsRouter.delete("/:id", authenticate, isValidId, ctrlWrapper(deleteChat));

export default chatsRouter;
