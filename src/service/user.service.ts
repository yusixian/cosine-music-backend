import { Prisma, PrismaClient, User } from '@prisma/client';

// user.service.ts
const prisma = new PrismaClient();

class UserService {
  async createUser(data: Prisma.UserCreateInput): Promise<Partial<User>> {
    return await prisma.user.create({
      data,
    });
  }
  async findUserByUserName(user_name: string) {
    const user = await prisma.user.findUnique({ where: { user_name } });
    return user;
  }
}
const userService = new UserService();
export default userService;
