export const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;

  return res.status(200).json({
    status: "Success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};
