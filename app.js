import express from "express";
import { contactsRouter, usersRouter } from "#routes/api/index.js";
import {
  jwtStrategyMiddleware,
  loggerMiddleware,
  corsMiddleware,
  notFoundError,
  internalError,
} from "#middleware/index.js";

const app = express();

jwtStrategyMiddleware(app);
loggerMiddleware(app);
corsMiddleware(app);

app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use(notFoundError);
app.use(internalError);

export { app };
