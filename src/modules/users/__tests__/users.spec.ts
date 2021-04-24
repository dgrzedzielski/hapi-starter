import { Server } from '@hapi/hapi';
import { ErrorResponse } from 'src/core/schema';
import {
  CreateUserPayload,
  CreateUserResponse,
} from 'src/modules/users/users.schema';
import { run as clearDb } from '~/scripts/clear-db';
import { run as seedDb } from '~/scripts/seed-db';
import { init } from '~/server';

describe('users module', () => {
  let server: Server;

  beforeAll(async () => {
    server = await init();
    await seedDb();
  });

  afterAll(async () => {
    await clearDb();
    await server.stop();
  });

  describe('POST /users', () => {
    const userData = {
      email: 'mail@test.com',
      password: 'zxasqw12',
    };

    const createUser = (payload: Partial<CreateUserPayload> = userData) => {
      return server.inject({
        url: '/users',
        method: 'POST',
        payload,
      });
    };

    it('should create user successfully', async () => {
      const response = await createUser();

      expect(response.statusCode).toEqual(201);
      expect((response.result as CreateUserResponse).user).toMatchObject({
        email: userData.email,
      });
    });

    it('should not be possible to create another user with same credentials', async () => {
      const response = await createUser();

      expect(response.statusCode).toEqual(400);
      expect((response.result as ErrorResponse).message).toEqual(
        'Email is already in use'
      );
    });

    it('should return validation error when email or password not provided', async () => {
      const noPasswordResponse = await createUser({ email: 'email@mail.com' });
      const noEmailResponse = await createUser({ password: 'password123' });
      const tooShortPasswordResponse = await createUser({
        email: 'email@test.com',
        password: 'pass',
      });
      const notValidEmailResponse = await createUser({
        email: 'email',
        password: 'okpassword',
      });

      expect(noPasswordResponse.statusCode).toEqual(400);
      expect(noEmailResponse.statusCode).toEqual(400);
      expect(tooShortPasswordResponse.statusCode).toEqual(400);
      expect(notValidEmailResponse.statusCode).toEqual(400);
    });
  });
});
