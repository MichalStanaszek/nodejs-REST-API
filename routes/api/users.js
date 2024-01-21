import express from "express";
const router = express.Router();

import { register, login } from "#controllers/users/index.js";
import { validation } from "#validation/validation.js";

router.post("/signup", validation, register);
router.post("/login", login);

export { router as usersRouter };
