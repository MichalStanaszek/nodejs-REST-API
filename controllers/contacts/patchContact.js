import Contact from "../../models/contactSchema.js";

export const patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({
      message: "missing field favorite",
    });
  }

  try {
    const contact = await Contact.findByIdAndUpdate(contactId, { favorite });
    contact.favorite = favorite;
    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
