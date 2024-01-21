import Contact from "#models/contactSchema.js";

export const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    await Contact.findByIdAndUpdate(contactId, body);
    return res.status(200).json({
      data: { contactId, ...body },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
