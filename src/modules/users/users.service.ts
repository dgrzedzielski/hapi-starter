import Boom from '@hapi/boom';
import { prisma } from '~/core/plugins/prisma';
import { generatePassword } from '~/modules/auth/auth.service';
import { CreateUserPayload } from '~/modules/users/users.schema';

export async function checkIfUserExists(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user !== null;
}

export async function createUser({ email, password }: CreateUserPayload) {
  const hashedPassword = await generatePassword(password);

  if (await checkIfUserExists(email))
    throw Boom.badRequest('Email is already in use');

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}
