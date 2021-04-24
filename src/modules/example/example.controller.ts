import Hapi from '@hapi/hapi';

export const routes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: `/example/hello`,
    handler: function () {
      return {
        message: 'Hello from example controller!',
      };
    },
    options: {
      auth: false,
      description: 'Get example',
      notes: `It's only example GET endpoint which returns some json response with message`,
      tags: ['example', 'api'],
    },
  },
  {
    method: 'GET',
    path: '/example/for-logged',
    handler: function () {
      return {
        message: 'Congrats! You are logged in!',
      };
    },
    options: {
      description: 'Example path with authentication required',
      notes: 'It will return 401 when user not logged',
      tags: ['example', 'api'],
    },
  },
];
