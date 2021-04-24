import HapiSwagger from 'hapi-swagger';

const options: HapiSwagger.RegisterOptions = {
  info: {
    title: 'Api Docs',
  },
  tags: [
    {
      name: 'example',
      description: 'Example endpoints to check if it works',
    },
  ],
  debug: true,
  documentationPath: '/docs',
};

export default {
  plugin: HapiSwagger,
  options,
};
