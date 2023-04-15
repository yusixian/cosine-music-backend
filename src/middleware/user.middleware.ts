import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextFunction, Response } from 'express';
import { RequestBody } from '../types/request';
import userService from '../service/user.service';
import commonRes from '../utils/commonRes';
import { UserLoginParam } from '../types/user.type';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
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

export const authVerify = (req: any, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];
  console.log('header', req.headers);
  const token = auth?.replace('Bearer ', '');
  if (!auth) {
    commonRes.error(res, null, '需要登录！');
    return;
  }
  try {
    // user中包含了payload的信息 User
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    req.body.user = user;
    next();
  } catch (e) {
    switch (e?.name) {
      case 'TokenExpiredError':
        commonRes.error(res, null, 'token已过期');
        return;
      case 'JsonWebTokenError':
        commonRes.error(res, null, '无效token');
        return;
    }
    commonRes.error(res, null, e.message);
  }
};
