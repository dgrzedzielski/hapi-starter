import Hapi from '@hapi/hapi';

const REQUIRED_ENV_VARS = ['COOKIE_NAME', 'AUTH_SECRET'];

export const validateEnvVars: Hapi.Plugin<null> = {
  name: 'app/validate-env-vars',
  register: async function (server: Hapi.Server) {
    REQUIRED_ENV_VARS.forEach((envVar) => {
      if (!process.env[envVar])
        server.log('warn', `The ${envVar} ENV_VAR is not set!`);
    });
  },
};
