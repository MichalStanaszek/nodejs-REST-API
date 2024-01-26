import User from "#models/userSchema.js";
import { subscriptionSchema } from "#validation/subscriptionSchema.js";

export const updateUserSubscription = async (req, res) => {
  const { id, email } = req.user;
  const { subscription } = req.body;

  //ENTRY DATA JOI VALIDATION
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { subscription });
    user.subscription = subscription;
    res.status(200).json({ email, subscription });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
