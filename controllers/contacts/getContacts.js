import Contact from "#models/contactSchema.js";

export const getContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find();

    return res.status(200).json({ data: allContacts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
