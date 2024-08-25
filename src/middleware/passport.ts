import { Strategy, Profile, VerifyCallback } from "passport-google-oauth20";
import passport from "passport";
import bcryptjs from "bcryptjs";
import { nanoid } from "nanoid";
import User from "../models/User.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://test-task-backend-reenbit.onrender.com/api/auth/google-redirect",
        passReqToCallback: true,
      },
      async (
        req,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: VerifyCallback
      ) => {
        try {
          const { emails = [], displayName = "", photos = [] } = profile;
          const email = emails[0]?.value || "";
          const picture = photos[0]?.value || "";
          const user = await User.findOne({ email });
          if (user) {
            return cb(null, user);
          }
          const password = await bcryptjs.hash(nanoid(), 10);
          const newUser = await User.create({
            username: displayName,
            email,
            avatar: picture,
            password,
          });
          cb(null, newUser);
        } catch (error) {
          cb(error, false);
        }
      }
    )
  );
}

export default passport;
