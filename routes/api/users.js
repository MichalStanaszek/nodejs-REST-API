import express from "express";
const router = express.Router();

import { register } from "#controllers/users/index.js";

router.post("/signup", register);

export { router as usersRouter };
