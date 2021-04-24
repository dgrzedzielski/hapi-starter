import { init as initServer, start as startServer } from '~/server';

(async function () {
  await initServer();
  await startServer();
})();
