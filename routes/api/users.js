import express from "express";
const router = express.Router();

import { register } from "#controllers/users/index.js";
import { validation } from "#validation/validation.js";

router.post("/signup", validation, register);

export { router as usersRouter };
