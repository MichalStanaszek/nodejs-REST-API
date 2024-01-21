import User from "#models/userSchema.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
    }

    const user = new User({ email });
    await user.setPassword(password);
    await user.save();
    return res.status(201).json({
      status: "Created",
      code: 201,
      data: { email },
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: error.message,
    });
  }
};
