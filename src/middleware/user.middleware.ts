import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextFunction, Response } from 'express';
import { RequestBody } from '../types/request';
import userService from '../service/user.service';
import commonRes from '../utils/commonRes';
import { UserLoginParam } from '../types/user.type';

/**
 * @description: 密码加密
 */
export const cryptPassword = (req: RequestBody<Prisma.UserCreateInput>, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt);
  req.body.password = hash;
  next();
};

/**
 * @description: 验证注册用户唯一性
 */
export const validateUniqueUser = async (req: RequestBody<Prisma.UserCreateInput>, res: Response, next: NextFunction) => {
  const { user_name } = req.body;
  const user = await userService.findUserByUserName(user_name);
  if (user) commonRes.error(res, null, '注册失败，用户名已存在！');
  else next();
};

/**
 * @description: 验证登录是否成功
 */
export const verifyLogin = async (req: RequestBody<UserLoginParam>, res: Response, next: NextFunction) => {
  const { user_name, password } = req.body;
  const user = await userService.findUserByUserName(user_name);
  //  验证用户唯一 并挂载到 body 上
  if (!user) {
    commonRes.error(res, null, '登录失败，用户名不存在！');
    return;
  }
  req.body = { ...user };
  //  密码是否匹配
  if (!bcrypt.compareSync(password, user.password)) {
    commonRes.error(res, null, '登录失败，密码错误！');
    return;
  }
  next();
};
