import User from "#models/userSchema.js";
import { schema } from "#validation/validation.js";

export async function register(req, res) {
  const { email, password } = req.body;

  //ENTRY DATA JOI VALIDATION
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      status: "Conflict",
      code: 409,
      message: "Email is already in use",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email is already in use",
      });
    }

    const newUser = new User({ email });
    const { subscription } = newUser;

    newUser.setAvatar(email);
    await newUser.setPassword(password);
    await newUser.save();

    return res.status(201).json({
      status: "Created",
      code: 201,
      data: { email, subscription },
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: error.message,
    });
  }
}
