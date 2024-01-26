import express from "express";
import { contactsRouter } from "#routes/api/contacts.js";
import { usersRouter } from "#routes/api/users.js";
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

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use(notFoundError);
app.use(internalError);

export { app };
