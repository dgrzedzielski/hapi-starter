import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const usersToCreate = [
  {
    email: 'user@test.com',
    password: '$2b$10$zN9K/1C0E8SvAjM5s1JPIuw4xfSOD5fLL1HDs1JDWj1shsjOTRivm', //secret
  },
  {
    email: 'user2@test.com',
    password: '$2b$10$zN9K/1C0E8SvAjM5s1JPIuw4xfSOD5fLL1HDs1JDWj1shsjOTRivm', //secret
  },
  {
    email: 'user3@test.com',
    password: '$2b$10$zN9K/1C0E8SvAjM5s1JPIuw4xfSOD5fLL1HDs1JDWj1shsjOTRivm', //secret
  },
  {
    email: 'user4@test.com',
    password: '$2b$10$zN9K/1C0E8SvAjM5s1JPIuw4xfSOD5fLL1HDs1JDWj1shsjOTRivm', //secret
  },
];

async function main() {
  console.log('seeding users: start');
  await prisma.user.createMany({ data: usersToCreate, skipDuplicates: true });
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
