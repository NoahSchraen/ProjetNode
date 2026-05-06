import Joi from "joi";

const title = Joi.string().required();
const description = Joi.string().required();
const duration = Joi.number().min(1).required();
const genre = Joi.string().required();
const image = Joi.string().required();

export const CreateMovieValidator = Joi.object({ title, description, duration, genre, image });

export const UpdateMovieValidator = Joi.object({ title, description, duration, genre, image });
