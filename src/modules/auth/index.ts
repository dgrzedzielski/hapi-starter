import Boom from '@hapi/boom';
import hapiCookie from '@hapi/cookie';
import Hapi from '@hapi/hapi';
import { defaultConfig } from '~/config/default';
import { getResponseSchemaForErrors } from '~/core/schema';
import {
  LoginPayload,
  loginPayloadSchema,
  loginResponseSchema,
} from '~/modules/auth/auth.schema';
import { signInUser, validateAuth } from '~/modules/auth/auth.service';
import { presentUser } from '~/modules/users';

export const authModule: Hapi.Plugin<null> = {
  name: 'app/auth',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    await server.register(hapiCookie);

    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: defaultConfig.auth.cookieName,
        password: defaultConfig.auth.secret,
        isSecure: process.env.NODE_ENV === 'production',
        isHttpOnly: true,
      },
      redirectTo: false,
      validateFunc: validateAuth,
    });

    server.auth.default('session');

    server.route([
      {
        method: 'POST',
        path: '/auth/login',
        handler: async function (request: Hapi.Request) {
          const user = await signInUser(request.payload as LoginPayload);
          if (!user) return Boom.badRequest('Wrong credentials');

          request.cookieAuth.set({ id: user.id });
          return {
            user: presentUser(user),
          };
        },
        options: {
          auth: {
            mode: 'try',
          },
          validate: {
            payload: loginPayloadSchema,
          },
          description: 'Login endpoint',
          tags: ['api', 'auth'],
          response: {
            status: {
              200: loginResponseSchema,
              ...getResponseSchemaForErrors([400]),
            },
          },
        },
      },
    ]);
  },
};
