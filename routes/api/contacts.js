import express from "express";
const router = express.Router();

import {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  patchContact,
} from "../../controllers/contacts/index.js";

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContact);

router.patch("/:contactId/favorite", patchContact);

export { router as contactsRouter };
