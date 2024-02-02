import User from "#models/userSchema.js";

export const verifyUser = async (req, res, next) => {
  try {
    const verificationToken = req.params.verificationToken;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    user.verificationToken = " ";
    user.verify = true;
    await user.save();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};
