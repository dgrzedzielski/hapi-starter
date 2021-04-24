import './env-setup';
import Hapi from '@hapi/hapi';
import { plugins } from '~/core/plugins';
import { modules } from '~/modules';

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

export const init = async () => {
  await server.register(plugins);
  await server.register(modules);
  await server.initialize();

  return server;
};

export const start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
