import Contact from "#models/contactSchema.js";

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await Contact.findByIdAndDelete(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
