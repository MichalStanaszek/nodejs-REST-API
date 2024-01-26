import logger from "morgan";

export const loggerMiddleware = (app) => {
  const formatsLogger = app.get("env") === "development" ? "dev" : "short";
  app.use(logger(formatsLogger));
};
