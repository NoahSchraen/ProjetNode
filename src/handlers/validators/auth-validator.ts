import Joi from "joi";

const email = Joi.string().email().required();
const password = Joi.string().min(8).required();

export const RegisterValidator = Joi.object({ email, password });

export const LoginValidator = Joi.object({ email, password });
