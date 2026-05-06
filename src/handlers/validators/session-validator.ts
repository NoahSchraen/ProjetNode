import Joi from "joi";

export const CreateSessionValidator = Joi.object({
    movieId: Joi.number().required(),
    roomId: Joi.number().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required()
});

export const UpdateSessionValidator = Joi.object({ startTime: Joi.date(), endTime: Joi.date()});
