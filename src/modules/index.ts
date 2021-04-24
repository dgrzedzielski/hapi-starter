import Hapi from '@hapi/hapi';
import { authModule } from '~/modules/auth';
import { exampleModule } from '~/modules/example';
import { usersModule } from '~/modules/users';

export const modules: Hapi.Plugin<null>[] = [
  exampleModule,
  authModule,
  usersModule,
];
