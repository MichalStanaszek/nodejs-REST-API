import express from "express";
import { authMiddleware } from "#middleware/authMiddleware.js";
const router = express.Router();

import {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  patchContact,
} from "#controllers/contacts/index.js";

router.get("/", authMiddleware, getContacts);
router.get("/:contactId", authMiddleware, getContactById);
router.post("/", authMiddleware, postContact);
router.delete("/:contactId", authMiddleware, deleteContact);
router.put("/:contactId", authMiddleware, putContact);
router.patch("/:contactId/favorite", authMiddleware, patchContact);

export { router as contactsRouter };
