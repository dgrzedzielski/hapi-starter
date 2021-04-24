import { Server } from '@hapi/hapi';
import { init } from '~/server';

describe('example module', () => {
  let server: Server;

  beforeAll(async () => {
    server = await init();
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('GET /hello', () => {
    it('will respond with 200 and return proper data', async () => {
      const res = await server.inject({
        method: 'get',
        url: '/example/hello',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.result).toMatchObject({
        message: 'Hello from example controller!',
      });
    });
  });
});
