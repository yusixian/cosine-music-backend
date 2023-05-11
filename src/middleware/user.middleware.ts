import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextFunction, Response } from 'express';
import { RequestBody } from '../types/request';
import userService from '../service/user.service';
import commonRes from '../utils/commonRes';
import { UserLoginParam } from '../types/user.type';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import logger from '../utils/logger';
/**
 * @description: 密码加密
 */
export const cryptPassword = async (req: RequestBody<Prisma.UserCreateInput>, res: Response, next: NextFunction) => {
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

/**
 * @description: 验证是否为用户
 */
export const authVerify = async (req: any, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];
  const token = auth?.replace('Bearer ', '');
  if (!auth) {
    commonRes.error(res, null, '需要登录！');
    return;
  }
  try {
    // user中包含了payload的信息 User
    const user = jwt.verify(token, JWT_SECRET);
    logger.info('authVerify user', user);
    req.body.user = user;
    next();
  } catch (e: any) {
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

/**
 * @description: 判断是否是管理员
 */
export const adminVerify = async (req: any, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];
  const token = auth?.replace('Bearer ', '');
  if (!auth) {
    commonRes.error(res, null, '需要登录！');
    return;
  }
  try {
    // user中包含了payload的信息 User
    const user = jwt.verify(token, JWT_SECRET) as User;
    const { type } = user ?? {};
    if (type !== 1) {
      commonRes.error(res, null, '需要管理员权限！');
      return;
    }
    req.user = user;
    next();
  } catch (e: any) {
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
