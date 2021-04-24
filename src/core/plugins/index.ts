/* eslint-disable @typescript-eslint/no-explicit-any */
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import hapiPino from '~/core/plugins/hapi-pino';
import hapiSwagger from '~/core/plugins/hapi-swagger';
import prismaPlugin from '~/core/plugins/prisma';
import { validateEnvVars } from '~/core/plugins/validate-env-vars';

export const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  hapiSwagger,
  hapiPino,
  {
    plugin: validateEnvVars,
  },
  {
    plugin: prismaPlugin,
  },
];
