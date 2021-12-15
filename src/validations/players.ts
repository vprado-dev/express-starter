import Joi from "joi";

export const playersPostOneBody = Joi.object({
  nickName: Joi.string().required(),
  age: Joi.number().required(),
  level: Joi.number().required(),
  classType: Joi.string().required(),
  description: Joi.string().required(),
}).required();

export const playersGetOneParams = Joi.object({
  playerId: Joi.number().required(),
}).required();

export const playersPatchOneBody = Joi.object({
  nickName: Joi.string(),
  age: Joi.number(),
  level: Joi.number(),
  classType: Joi.string(),
  description: Joi.string(),
})
  .min(1)
  .required();
