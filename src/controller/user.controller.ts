// user.controller.ts
import { Prisma, User } from '@prisma/client';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import userService from '../service/user.service';
import { RequestBody } from '../types/request';
import commonRes from '../utils/commonRes';
import silentHandle from '../utils/silentHandle';

class UserController {
  /**
   * @description: 注册函数
   */
  public async register(req: RequestBody<Prisma.UserCreateInput>, res: Response) {
    const [e, user] = await silentHandle(userService.createUser, req.body);
    return e ? commonRes.error(res, null, e.message) : commonRes(res, user);
  }
  /**
   * @description: 登录函数
   */
  public async login(req: RequestBody<User>, res: Response) {
    const { password, ...user } = req.body; // exclude password
    const [e, result] = await silentHandle(() => ({
      token: jwt.sign(user, JWT_SECRET, { expiresIn: '1d' }),
      sessionid: new Date().getTime(),
      user,
    }));

    return e ? commonRes.error(res, null, e.message) : commonRes(res, result, { message: '登录成功!' });
  }
  /**
   * @description: token授权后获取用户信息函数
   */
  public async getInfoByAuth(req: RequestBody<User> | Request, res: Response) {
    // console.log('req', req);
    const [e, result] = await silentHandle(() => {
      const { user } = req.body;
      return user;
    });

    return e ? commonRes.error(res, null, e.message) : commonRes(res, result, { message: '获取用户信息成功!' });
  }
}

const userController = new UserController();
export default userController;
