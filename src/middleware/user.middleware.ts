import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextFunction, Response } from 'express';
import { RequestBody } from '../types/request';
import userService from '../service/user.service';
import commonRes from '../utils/commonRes';

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
  if (user) commonRes.error(res, null, '用户名已存在');
  else next();
};
