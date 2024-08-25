import express, { Router } from "express";
import {
  authenticate,
  isEmptyBody,
  passport,
} from "../../middleware//index.js";
import { userLoginSchema, userRegisterSchema } from "../../models/User.js";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  register,
  current,
  logout,
  login,
  googleAuth,
} from "../../controllers/auth-controllers/index.js";

const authRouter: Router = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  isValidBody(userRegisterSchema),
  ctrlWrapper(register)
);

authRouter.get("/current", authenticate, current);

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.post(
  "/login",
  isEmptyBody,
  isValidBody(userLoginSchema),
  ctrlWrapper(login)
);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
  "/google-redirect",
  passport.authenticate("google", { session: false }),
  ctrlWrapper(googleAuth)
);

export default authRouter;
