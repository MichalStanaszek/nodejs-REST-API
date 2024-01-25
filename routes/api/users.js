import express from "express";
import { authMiddleware } from "#middleware/authMiddleware.js";
const router = express.Router();

import { register, login, logout } from "#controllers/users/index.js";

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);

export { router as usersRouter };
