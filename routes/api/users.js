import express from "express";
import { authMiddleware } from "#middleware/authMiddleware.js";
const router = express.Router();

import {
  register,
  login,
  logout,
  currentUser,
  updateUserSubscription,
} from "#controllers/users/index.js";

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, currentUser);
router.patch("/subscription", authMiddleware, updateUserSubscription);

export { router as usersRouter };
