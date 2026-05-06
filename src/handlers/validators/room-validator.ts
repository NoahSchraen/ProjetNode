import Joi from "joi";

const name = Joi.string().min(2);
const description = Joi.string().allow(null, "");
const images = Joi.string().allow(null, "");
const type = Joi.string();
const capacity = Joi.number().integer().min(15).max(30);
const handicapAccess = Joi.boolean();

export const CreateRoomValidator = Joi.object({
    name: name.required(),
    description,
    images,
    type: type.required(),
    capacity: capacity.required(),
    handicapAccess
});

export const UpdateRoomValidator = Joi.object({
    name,
    description,
    images,
    type,
    capacity,
    handicapAccess
});
