import express from "express";
import path from "path";
import { contactsRouter, usersRouter } from "#routes/api/index.js";
import { createFolderIfNotExist } from "#helpers/createFolderIfNotExist.js";
import {
  jwtStrategyMiddleware,
  loggerMiddleware,
  corsMiddleware,
  notFoundError,
  internalError,
} from "#middleware/index.js";

const tempDir = path.join(process.cwd(), "temp");
const storageImage = path.join(process.cwd(), "public/avatars");

const app = express();

createFolderIfNotExist(tempDir);
createFolderIfNotExist(storageImage);

jwtStrategyMiddleware(app);
loggerMiddleware(app);
corsMiddleware(app);

app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use(notFoundError);
app.use(internalError);

export { app };
