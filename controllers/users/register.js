import User from "#models/userSchema.js";
import { schema } from "#validation/validation.js";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "#helpers/nodemailer.js";

export async function register(req, res) {
  const { email, password } = req.body;

  //ENTRY DATA JOI VALIDATION
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
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

    const verificationToken = uuidv4();
    const newUser = new User({ email, verificationToken });
    const { subscription } = newUser; // czy ta subskrybcja nie może być wyżej w new User?

    newUser.setAvatar(email);
    await newUser.setPassword(password);
    await newUser.save();

    await sendEmail(email, verificationToken);

    return res.status(201).json({
      status: "Created",
      code: 201,
      data: { email, subscription, verificationToken },
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: error.message,
    });
  }
}
