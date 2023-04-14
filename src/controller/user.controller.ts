// user.controller.ts
import { Response } from 'express';
import commonRes from '../utils/commonRes';
import silentHandle from '../utils/silentHandle';
import { Prisma } from '@prisma/client';
import { RequestBody } from '../types/request';
import userService from '../service/user.service';

class UserController {
  /**
   * @description: 注册函数
   */
  public async createUserHandler(req: RequestBody<Prisma.UserCreateInput>, res: Response) {
    const [e, user] = await silentHandle(userService.createUser, req.body);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, user);
  }
}
const userController = new UserController();
export default userController;
