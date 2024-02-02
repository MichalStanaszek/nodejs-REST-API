import User from "#models/userSchema.js";

export const verifyUser = async (req, res, next) => {
  try {
    const verificationToken = req.param.verificationToken;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
