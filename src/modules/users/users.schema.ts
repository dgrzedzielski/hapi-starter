import { User } from '@prisma/client';
import Joi from 'joi';

export type CreateUserPayload = {
  email: string;
  password: string;
};

export type CreateUserResponse = {
  user: Omit<User, 'id' | 'password'>;
};

export const userSchema = Joi.object({
  email: Joi.string(),
}).label('User');

export const createUserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).label('CreateUserPayload');

export const createUserResponseSchema = Joi.object({
  user: userSchema,
}).label('CreateUserResponse');
