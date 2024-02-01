import cors from "cors";

export const corsMiddleware = (app) => {
  app.use(cors());
};
