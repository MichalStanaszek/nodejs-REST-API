import User from "#models/userSchema.js";

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    req.user = null;
  } catch (error) {
    next(error);
  }
  console.log("logout");
  return res.status(204).end();
};
