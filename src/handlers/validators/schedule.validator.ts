import Joi from "joi";

export const ScheduleValidator = Joi.object({ from: Joi.date().required(), to: Joi.date().required() });
