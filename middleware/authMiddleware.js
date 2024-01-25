import passport from "passport";
import { jwtStrategy } from "../auth/jwtStrategy.js";

export const authMiddleware = (req, res, next) => {
  passport.authenticate(jwtStrategy, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized.",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
