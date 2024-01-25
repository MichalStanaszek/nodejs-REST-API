import Contact from "#models/contactSchema.js";

export const getContacts = async (req, res, next) => {
  try {
    //Default values for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const allContacts = await Contact.find().skip(skip).limit(limit);
    const total = await Contact.countDocuments();

    return res.status(200).json({
      data: allContacts,
      currentPage: page,
      numberOfPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
