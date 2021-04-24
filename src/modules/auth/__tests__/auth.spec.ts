import { Server } from '@hapi/hapi';
import { LoginPayload } from '../auth.schema';
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

  describe('POST /auth/login', () => {
    const loginData = {
      email: 'user@test.com',
      password: 'secret',
    };

    const doLogin = (payload: Partial<LoginPayload> = loginData) => {
      return server.inject({
        url: '/auth/login',
        method: 'POST',
        payload,
      });
    };

    it('should return 400 when credentials are not valid', async () => {
      const response = await doLogin({ ...loginData, password: 'abc' });

      expect(response.statusCode).toEqual(400);
    });

    it('should successfully return user data when credentials are valid', async () => {
      const response = await doLogin();

      expect(response.statusCode).toEqual(200);
      expect(response.headers['set-cookie'][0]).toContain(
        process.env.COOKIE_NAME
      );
    });
  });
});
