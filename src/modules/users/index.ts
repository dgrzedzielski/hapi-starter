import Hapi from '@hapi/hapi';
import { User } from '@prisma/client';
import R from 'ramda';
import { getResponseSchemaForErrors } from '~/core/schema';
import {
  CreateUserPayload,
  createUserPayloadSchema,
  createUserResponseSchema,
} from '~/modules/users/users.schema';
import { createUser } from '~/modules/users/users.service';

export function presentUser(user: User) {
  return R.omit(['password', 'id'], user);
}

export const usersModule: Hapi.Plugin<null> = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'POST',
        path: '/users',
        handler: async function (request, h) {
          const user = await createUser(request.payload as CreateUserPayload);

          return h
            .response({
              user: presentUser(user),
            })
            .code(201);
        },
        options: {
          auth: {
            mode: 'try',
          },
          tags: ['api', 'users'],
          validate: {
            payload: createUserPayloadSchema,
          },
          response: {
            status: {
              201: createUserResponseSchema,
              ...getResponseSchemaForErrors([400]),
            },
          },
        },
      },
    ]);
  },
};
