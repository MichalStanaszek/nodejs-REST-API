import passport from "passport";
import { jwtStrategy } from "#auth/jwtStrategy.js";

export const jwtStrategyMiddleware = (app) => {
  passport.use(jwtStrategy);
};
