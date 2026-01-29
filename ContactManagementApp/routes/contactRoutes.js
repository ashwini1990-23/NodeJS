import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContactById,
} from "../controllers/contactController.js";

export const contactRouter = express.Router();

contactRouter.get("/", getAllContacts);

contactRouter.post("/", createContact);

//contactRouter.route("/").get(getAllContacts).post(createContact);

contactRouter.get("/:id", getContact);

contactRouter.put("/:id", updateContactById);

contactRouter.delete("/:id", deleteContact);

//contactRouter.route('/:id').get(getContact).put(updateContactById).delete(deleteContact)
