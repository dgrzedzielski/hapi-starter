import Hapi from '@hapi/hapi';
import bcrypt from 'bcrypt';
import { prisma } from '~/core/plugins/prisma';
import { LoginPayload } from '~/modules/auth/auth.schema';

const saltRounds = 12;

export async function validateAuth(
  request: Hapi.Request,
  session: { id: string }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (!user) return { valid: false };

  return {
    valid: true,
    credentials: user,
  };
}

export async function generatePassword(password: string) {
  return bcrypt.hash(password, saltRounds);
}

export async function signInUser({ email, password }: LoginPayload) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);

  return match ? user : null;
}
