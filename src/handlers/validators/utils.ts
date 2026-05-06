import Joi from "joi";

export const generateValidationErrorMessage = (
    details: Joi.ValidationErrorItem[] ) => {
    return { error: details[0].message }; };
