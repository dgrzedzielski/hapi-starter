import Hapi from '@hapi/hapi';
import { PrismaClient } from '@prisma/client';

declare module '@hapi/hapi' {
  interface ServerApplicationState {
    prisma: PrismaClient;
  }
}

export const prisma = new PrismaClient();

export const prismaPlugin = {
  name: 'prisma',
  register: async function (server: Hapi.Server) {
    server.app.prisma = prisma;
    server.ext({
      type: 'onPostStop',
      method: async (server: Hapi.Server) => {
        server.app.prisma.$disconnect();
      },
    });
  },
};

export default prismaPlugin;
