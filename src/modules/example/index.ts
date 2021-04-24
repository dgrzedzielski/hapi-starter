import Hapi from '@hapi/hapi';
import { routes } from '~/modules/example/example.controller';

export const exampleModule: Hapi.Plugin<null> = {
  name: 'app/example',
  register: async function (server: Hapi.Server) {
    server.route(routes);
  },
};
