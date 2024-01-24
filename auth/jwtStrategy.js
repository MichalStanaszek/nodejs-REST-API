import pasportJwt from "passport-jwt";
import User from "#models/userSchema.js";
import { config } from "dotenv";

config();

export const jwtStrategy = new pasportJwt.Strategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: pasportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (payload, done) => {
    User.findOne({ _id: payload.id })
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(new Error("Token is invalid"));
      })
      .catch((err) => {
        return done(err);
      });
  }
);
