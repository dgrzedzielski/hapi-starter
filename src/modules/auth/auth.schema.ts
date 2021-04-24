import Joi from 'joi';
import { userSchema } from '~/modules/users/users.schema';

export type LoginPayload = {
  email: string;
  password: string;
};

export const loginPayloadSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).label('LoginPayload');

export const loginResponseSchema = Joi.object({
  user: userSchema,
}).label('LoginResponseSchema');
