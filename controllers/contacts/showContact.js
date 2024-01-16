import Contact from "../../models/contactSchema.js";
export const showContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await Contact.findById(contactId);
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
