import Joi from "joi";

export const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
