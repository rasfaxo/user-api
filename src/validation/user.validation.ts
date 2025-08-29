import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,}$/)
    .required(),
  isActive: Joi.boolean().default(true),
  department: Joi.string().allow("", null),
});

export const updateUserSchema = Joi.object({
  id: Joi.any().strip(),
  name: Joi.string().min(1),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]{10,}$/),
  isActive: Joi.boolean(),
  department: Joi.string().allow("", null),
}).min(1);
