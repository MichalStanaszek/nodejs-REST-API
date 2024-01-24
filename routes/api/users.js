import express from "express";
const router = express.Router();

import { register, login } from "#controllers/users/index.js";

router.post("/signup", register);
router.post("/login", login);

export { router as usersRouter };
