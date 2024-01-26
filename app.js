import express from "express";

import cors from "cors";
import { contactsRouter } from "#routes/api/contacts.js";
import { usersRouter } from "#routes/api/users.js";
import { jwtStrategyMiddleware, loggerMiddleware } from "#middleware/index.js";

const app = express();

jwtStrategyMiddleware(app);
loggerMiddleware(app);

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
