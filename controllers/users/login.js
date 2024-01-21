import User from "#models/userSchema.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is invalid",
    });
  }

  const isPasswordValid = await user.validPassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is invalid",
    });
  }

  console.log("udało się");
};
