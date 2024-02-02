import express from "express";
import { authMiddleware, uploadMiddleware } from "#middleware/index.js";
const router = express.Router();

import {
  register,
  login,
  logout,
  currentUser,
  updateUserSubscription,
  updateAvatar,
  verifyUser,
} from "#controllers/users/index.js";

router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, currentUser);
router.get("/verify/:verificationToken", verifyUser);

router.post("/signup", register);
router.post("/login", login);

router.patch("/subscription", authMiddleware, updateUserSubscription);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  updateAvatar
);

export { router as usersRouter };
