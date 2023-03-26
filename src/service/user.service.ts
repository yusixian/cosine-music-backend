import { Prisma, PrismaClient, User } from '@prisma/client';

// user.service.ts
const prisma = new PrismaClient();

async function createUser(data: Prisma.UserCreateInput): Promise<Partial<User>> {
  return await prisma.user.create({
    data,
  });
}

export { createUser };
