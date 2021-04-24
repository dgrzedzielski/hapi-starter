import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('clearing users');
  await prisma.user.deleteMany({});
}

export async function run() {
  if (process.env.NODE_ENV === 'production') return;

  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

run();
