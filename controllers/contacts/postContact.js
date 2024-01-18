import Contact from "../../models/contactSchema.js";
export const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const existedName = await Contact.findOne({ name });
    const existedEmail = await Contact.findOne({ email });
    const existedPhone = await Contact.findOne({ phone });

    if (existedName) {
      return res.status(409).json({
        message: "There is an contact with name " + name,
      });
    }
    if (existedEmail) {
      return res.status(409).json({
        message: "There is an contact with email " + email,
      });
    }
    if (existedPhone) {
      return res.status(409).json({
        message: "There is an contact with phone " + phone,
      });
    }

    const contact = await Contact.create(req.body);
    return res.status(201).json(contact);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
